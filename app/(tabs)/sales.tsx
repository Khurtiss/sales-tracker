import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

/*
  Simple Sales Tracker App (Expo)
  - Tracks daily SIM registrations and MoMo app downloads
  - Aggregates data for the current ISO week
  - Weekly target is configurable (default 15)
*/

/* ----------------- Config ----------------- */
const STORAGE_KEY = 'SIM_APP_ENTRIES_v1'; // JSON: { "YYYY-MM-DD": { sims: number, momo: number }, ... }
const WEEKLY_TARGET = 15;

/* ----------- Helper: date & week utils ----------- */

// format date to YYYY-MM-DD
function formatDate(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// get ISO week number + ISO week year
// returns string like "2025-W41" so week grouping is stable across year boundaries
function getISOWeekKey(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // ISO week date weeks start on Monday, so correct day number
  const dayNum = d.getUTCDay() || 7;
  // Thursday in current week decides the year
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2,'0')}`;
}

/* ----------------- App ----------------- */
export default function SalesTrackerScreen() {
  const today = new Date();
  const todayKey = formatDate(today);

  const [entries, setEntries] = useState({}); // map date -> {sims, momo}
  const [simsInput, setSimsInput] = useState('');
  const [momoInput, setMomoInput] = useState('');

  // load saved entries
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setEntries(JSON.parse(raw));
        }
      } catch (e) {
        console.warn('Failed to load entries', e);
      }
    })();
  }, []);

  // save entries map to AsyncStorage and attempt to sync to server
  // SERVER_URL can be configured via app.json `expo.extra.SERVER_URL` for production builds.
  const manifestExtra = (Constants.manifest && Constants.manifest.extra) || (Constants.expoConfig && Constants.expoConfig.extra) || {};
  const SERVER_URL = manifestExtra.SERVER_URL || 'http://10.0.2.2:4000'; // default to localhost for emulator
  const persistEntries = async (newEntries) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
    } catch (e) {
      console.warn('Failed to save locally', e);
      Alert.alert('Save failed', 'Could not save the entry locally.');
    }

    // try syncing to server (best-effort)
    try {
      await fetch(`${SERVER_URL}/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntries),
      });
    } catch (err) {
      console.warn('Sync to server failed', err);
      // don't surface to user; we'll rely on local storage and manager can fetch when online
    }
  };

  function computeWeekTotals() {
    const weekKey = getISOWeekKey(new Date());
    let sims = 0, momo = 0;
    for (const [dateStr, val] of Object.entries(entries)) {
      const d = new Date(dateStr + 'T00:00:00Z'); // treat as UTC date
      const k = getISOWeekKey(d);
      if (k === weekKey) {
        sims += Number(val?.sims || 0);
        momo += Number(val?.momo || 0);
      }
    }
    return { sims, momo, weekKey };
  }

  const { sims: weeklySims, momo: weeklyMomo } = computeWeekTotals();

  // derived metrics
  const remaining = Math.max(0, WEEKLY_TARGET - weeklySims);
  const percent = Math.min(100, Math.round((weeklySims / WEEKLY_TARGET) * 10000) / 100); // 2 decimals

  // submit today's entry (overwrites today's values)
  function onSubmitToday() {
    const simsVal = simsInput.trim() === '' ? 0 : Number(simsInput);
    const momoVal = momoInput.trim() === '' ? 0 : Number(momoInput);

    if (Number.isNaN(simsVal) || simsVal < 0 || !Number.isFinite(simsVal)) {
      Alert.alert('Invalid input', 'Please enter a valid non-negative number for SIMs.');
      return;
    }
    if (Number.isNaN(momoVal) || momoVal < 0 || !Number.isFinite(momoVal)) {
      Alert.alert('Invalid input', 'Please enter a valid non-negative number for MoMo apps.');
      return;
    }

    // update entries object
    const updated = {
      ...entries,
      [todayKey]: {
        sims: simsVal,
        momo: momoVal
      }
    };
    setEntries(updated);
    persistEntries(updated);
    Alert.alert('Saved', `Today&apos;s entry saved: ${simsVal} SIM(s), ${momoVal} MoMo app(s).`);
  }

  // quick-add helpers to increment today's sims by 1 or reset week (dev/testing)
  function quickIncrementSim() {
    const current = entries[todayKey]?.sims || 0;
    const updated = { ...entries, [todayKey]: { sims: current + 1, momo: entries[todayKey]?.momo || 0 } };
    setEntries(updated); 
    persistEntries(updated);
  }

  async function resetAllData() {
    // careful: destructive
    Alert.alert('Reset all data', 'Are you sure? This will delete all saved entries.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setEntries({});
      }}
    ]);
  }

  function getWeekDayRows() {
    const weekKey = getISOWeekKey(new Date());
    const rows = [];
    const sortedDates = Object.keys(entries).sort();
    for (const dateStr of sortedDates) {
      const d = new Date(dateStr + 'T00:00:00Z');
      if (getISOWeekKey(d) === weekKey) {
        rows.push({ date: dateStr, ...entries[dateStr] });
      }
    }
    return rows;
  }

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
          <Text style={styles.title}>Field Sales Tracker</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Number of SIMs registered today</Text>
            <TextInput
              keyboardType="number-pad"
              value={simsInput}
              onChangeText={t => setSimsInput(t.replaceAll(/\D/g, ''))}
              placeholder="e.g. 3"
              style={styles.input}
            />

            <Text style={[styles.label, {marginTop:12}]}>Number of MoMo apps downloaded today</Text>
            <TextInput
              keyboardType="number-pad"
              value={momoInput}
              onChangeText={t => setMomoInput(t.replaceAll(/\D/g, ''))}
              placeholder="e.g. 2"
              style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={onSubmitToday}>
              <Text style={styles.buttonText}>Submit Today&apos;s Entry</Text>
            </TouchableOpacity>

            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:8}}>
              <TouchableOpacity onPress={() => { setSimsInput(String((entries[todayKey]?.sims || 0))); setMomoInput(String((entries[todayKey]?.momo || 0))); }} style={styles.miniButton}>
                <Text style={styles.miniText}>Load Today&apos;s</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={quickIncrementSim} style={styles.miniButton}>
                <Text style={styles.miniText}>+1 SIM (quick)</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={resetAllData} style={[styles.miniButton, {backgroundColor:'#ffdddd'}]}>
                <Text style={[styles.miniText, {color:'#900'}]}>Reset All</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.subtitle}>Weekly Summary</Text>
            <Text style={styles.summaryText}>Weekly target: {WEEKLY_TARGET} SIMs</Text>
            <Text style={styles.summaryText}>Total SIMs this week: {weeklySims} / {WEEKLY_TARGET}</Text>

            <View style={styles.progressBarWrap}>
              <View style={[styles.progressBarFill, {width: `${Math.min(100, (weeklySims/WEEKLY_TARGET)*100)}%`}]}/>
            </View>
            <Text style={styles.summaryText}>Progress: {percent}%</Text>
            <Text style={styles.summaryText}>Remaining SIMs to reach weekly target: {remaining}</Text>
            <Text style={[styles.summaryText, {marginTop:8}]}>Total MoMo apps this week: {weeklyMomo}</Text>

            <View style={{marginTop:12}}>
              <Text style={{fontWeight:'600', marginBottom:6}}>This week — entries by day</Text>
              {getWeekDayRows().length === 0 ? (
                <Text style={{color:'#666'}}>No entries for this week yet.</Text>
              ) : (
                getWeekDayRows().map(r => (
                  <View key={r.date} style={styles.dayRow}>
                    <Text style={{fontWeight:'600'}}>{r.date}</Text>
                    <Text>{r.sims} SIM(s) • {r.momo} MoMo</Text>
                  </View>
                ))
              )}
            </View>
          </View>

          <Text style={styles.hint}>Tip: Enter each day&apos;s totals (overwrites that day). Data is stored locally on the device.</Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ----------------- Styles ----------------- */
const styles = StyleSheet.create({
  root: { flex:1, backgroundColor:'#f7f7fb' },
  container: { padding:20, paddingBottom:40 },
  title: { fontSize:22, fontWeight:'700', marginVertical:6, textAlign:'center' },
  card: { backgroundColor:'#fff', borderRadius:12, padding:16, marginTop:14, shadowColor:'#000', shadowOpacity:0.06, shadowRadius:10, elevation:3 },
  label: { fontSize:14, marginBottom:6, color:'#333' },
  input: { borderWidth:1, borderColor:'#e3e3ee', borderRadius:8, padding:10, fontSize:16, backgroundColor:'#fff' },
  button: { marginTop:12, backgroundColor:'#246bfa', paddingVertical:12, borderRadius:8, alignItems:'center' },
  buttonText: { color:'#fff', fontWeight:'700' },
  miniButton: { paddingVertical:8, paddingHorizontal:10, backgroundColor:'#eee', borderRadius:8 },
  miniText: { fontSize:12, color:'#333' },
  subtitle: { fontSize:18, fontWeight:'700' },
  summaryText: { marginTop:6, fontSize:15, color:'#222' },
  progressBarWrap: { marginTop:8, height:14, backgroundColor:'#eee', borderRadius:8, overflow:'hidden' },
  progressBarFill: { height:14, backgroundColor:'#3b82f6' },
  dayRow: { flexDirection:'row', justifyContent:'space-between', paddingVertical:6, borderBottomWidth:0.5, borderColor:'#eee' },
  hint: { marginTop:18, color:'#666', textAlign:'center' }
});
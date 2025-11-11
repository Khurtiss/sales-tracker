import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const STORAGE_KEY = 'SIM_APP_ENTRIES_v1';

export default function ManagerScreen() {
  const [entries, setEntries] = useState<Record<string, { sims?: number; momo?: number }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setEntries(JSON.parse(raw));
      } catch (e) {
        console.warn('Failed to load entries', e);
        Alert.alert('Error', 'Could not load saved entries.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function generateCSV(obj) {
    // CSV header
    const rows = [['date', 'sims', 'momo']];
    const dates = Object.keys(obj).sort();
    for (const d of dates) {
      const v = obj[d] || {};
      rows.push([d, String(v.sims ?? ''), String(v.momo ?? '')]);
    }
    return rows
      .map((r) =>
        r
          .map((c) => (String(c).includes(',') ? `"${String(c).replaceAll('"', '""')}"` : c))
          .join(','),
      )
      .join('\n');
  }

  const onCopyCSV = async () => {
    const csv = generateCSV(entries);
    try {
      await Clipboard.setStringAsync(csv);
      Alert.alert('Copied', 'CSV data copied to clipboard.');
    } catch (e) {
      console.warn('Copy failed', e);
      Alert.alert('Error', 'Failed to copy to clipboard.');
    }
  };

  const onShareCSV = async () => {
    const csv = generateCSV(entries);
    try {
      await Share.share({ message: csv, title: 'Sales Tracker Export' });
    } catch (e) {
      console.warn('Share failed', e);
      Alert.alert('Error', 'Failed to open share dialog.');
    }
  };

  // render rows depending on state
  let content: React.ReactNode;
  if (loading) {
    content = <Text style={styles.p}>Loading…</Text>;
  } else if (Object.keys(entries).length === 0) {
    content = <Text style={styles.p}>No saved entries.</Text>;
  } else {
    content = (
      <View>
        {Object.keys(entries)
          .sort()
          .map((date) => (
            <View key={date} style={styles.row}>
              <Text style={{ fontWeight: '600' }}>{date}</Text>
              <Text>{entries[date]?.sims ?? 0} SIM(s) • {entries[date]?.momo ?? 0} MoMo</Text>
            </View>
          ))}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Manager — Data Export</Text>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Stored Entries</Text>
        {content}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={onCopyCSV}>
            <Text style={styles.buttonText}>Copy CSV</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#4b5563' }]} onPress={onShareCSV}>
            <Text style={styles.buttonText}>Share CSV</Text>
          </TouchableOpacity>
        </View>
      </View>

  <Text style={styles.hint}>Use the Copy or Share actions to send the week&apos;s data to a manager (email, chat, etc.).</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 14 },
  subtitle: { fontSize: 16, fontWeight: '700' },
  p: { marginTop: 8, color: '#666' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 0.5, borderColor: '#eee' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  button: { flex: 1, marginRight: 8, backgroundColor: '#2563eb', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  hint: { marginTop: 12, color: '#666' }
});
# Sales Tracker - User Guide

## 🎯 What is Sales Tracker?

Sales Tracker is a mobile and web app for tracking daily SIM card registrations and MoMo app downloads. It helps you:
- Record daily counts of SIM registrations and MoMo downloads
- View your progress towards weekly targets (15 units per week)
- Export data as CSV for reports and analysis
- Sync data across devices

---

## 🚀 How to Access the App

### **Option 1: Web App (Easiest - No Installation)**

Simply open your browser and visit:
```
https://Khurtiss.github.io/sales-tracker
```

✅ **Works on:** Computer, tablet, phone (any browser)  
✅ **No installation needed**  
✅ **Works offline** - saves data locally even if internet goes down  

---

### **Option 2: Mobile App (iOS/Android)**

#### **Via Expo Go (Quickest for Testing)**

1. **Install Expo Go app:**
   - iOS: Download from [App Store](https://apps.apple.com/us/app/expo-go/id1618668236)
   - Android: Download from [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Open Expo Go app**

3. **Scan this QR code or enter project link:**
   - Link: `https://expo.dev/@your-username/sales-tracker` (if published)
   - Or ask the developer for the QR code

4. **App loads instantly!** ✨

---

#### **Via Native App Build (Production)**

1. Install the app from:
   - **iOS App Store** (if deployed)
   - **Google Play Store** (if deployed)

2. Open the app and start using

*(Note: These require the developer to build and submit to app stores)*

---

## 📱 Using the App

### **Main Screens**

The app has 4 main tabs at the bottom:

#### **1️⃣ Sales Tracker (Entry Form)**
- **What it does:** Enter your daily SIM and MoMo counts
- **How to use:**
  1. Type in the number of SIMs registered today
  2. Type in the number of MoMo app downloads today
  3. Tap **Save** button
  4. Your entry is saved to your phone/browser
  5. The app automatically syncs to the server (if available)

- **Weekly Summary:** Shows your total for this week and progress towards 15-unit target
  - Green = on track ✅
  - Yellow/Red = need more entries ⚠️

#### **2️⃣ Manager (Data Export)**
- **What it does:** View all your saved entries and export data
- **How to use:**
  1. **View entries:** Scroll to see all past entries
  2. **Copy CSV:** Tap "Copy CSV" to copy data to clipboard (paste into email, Excel, etc.)
  3. **Share CSV:** Tap "Share CSV" to email/send data to others

#### **3️⃣ Home (Dashboard)**
- Welcome screen with information about the app

#### **4️⃣ Explore**
- Additional features (coming soon)

---

## 💾 Data & Sync

### **How Data is Stored**

**Local Storage (Your Device):**
- All entries are saved automatically on your phone/browser
- Works completely offline
- Data persists even if you close the app

**Server Sync (Optional):**
- If the server is available, data is synced automatically
- Allows you to see data on different devices
- If server is down, app still works perfectly offline

### **Your Data**

Your data is stored in a simple date format:
```
Date          | SIMs  | MoMo
2025-11-11    | 5     | 3
2025-11-10    | 4     | 2
2025-11-09    | 6     | 4
```

---

## 📊 Weekly Target Explained

**Target:** 15 units per week (combined SIMs + MoMo)

**Example:**
```
Week: 2025-W45
Monday:     2 SIMs + 1 MoMo = 3
Tuesday:    3 SIMs + 2 MoMo = 5
Wednesday:  4 SIMs + 3 MoMo = 7
Thursday:   2 SIMs + 2 MoMo = 4
TOTAL:                       19 ✅ (Exceeded target!)
```

The app groups entries by ISO week (Mon-Sun), so you can see your progress throughout the week.

---

## 🔄 Syncing Between Devices

### **Same Device:**
Data automatically saves to your phone/browser storage. Open the app anytime to see your data.

### **Different Devices:**
If the server is configured:
1. Enter data on Device A → saves locally + syncs to server
2. Open app on Device B → data syncs from server
3. Both devices stay in sync ✅

If server isn't available, each device maintains its own copy (no sync).

---

## ⚙️ Settings & Customization

Currently, there are no user settings. All configuration is done by the administrator:

| Setting | Current Value |
|---------|---------------|
| Weekly Target | 15 units |
| Server URL | `https://sales-tracker-server.onrender.com` |
| Data Key | `SIM_APP_ENTRIES_v1` |

*(To change these, contact the app developer)*

---

## 🆘 Troubleshooting

### **"Can't access the web app"**
- Check your internet connection
- Try refreshing the page (F5 or Cmd+R)
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Try a different browser

### **"Data disappeared"**
- Check if you're logged into the right account/device
- Data is stored locally; if you clear browser data, it may be lost
- **Backup:** Export to CSV regularly!

### **"Server sync not working"**
- This is OK! The app still works offline
- Your data saves locally and will sync when server is back online
- Check `Manager` tab to confirm your data is saved

### **"App loading slowly"**
- First load downloads all files (~300KB) - this is normal
- Subsequent loads are much faster
- If very slow, try:
  - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
  - Close other browser tabs to free up memory

---

## 💡 Tips & Best Practices

### **✅ Do:**
- ✅ Save entries at the end of each day
- ✅ Use the CSV export to backup your data weekly
- ✅ Check weekly totals to stay on track with targets
- ✅ Close the app cleanly (don't force close on mobile)

### **❌ Don't:**
- ❌ Clear browser cache/cookies (loses data!)
- ❌ Rely only on server sync (always have local backup)
- ❌ Edit exported CSV in different formats (Excel can corrupt data)
- ❌ Assume data is gone if refresh looks slow

---

## 📥 Exporting & Backing Up Data

### **Export to CSV:**

1. Go to **Manager** tab
2. Tap **Copy CSV** or **Share CSV**
3. Data format:
   ```
   date,sims,momo
   2025-11-11,5,3
   2025-11-10,4,2
   ```

### **Import Data (If You Switch Devices):**
- Currently no import feature
- Contact developer to manually restore data

### **Backup Schedule:**
- **Weekly:** Export CSV and save to cloud (Google Drive, Dropbox, etc.)
- **Before updates:** Export data just in case

---

## 🌐 Supported Platforms

| Platform | Support | Method |
|----------|---------|--------|
| Windows | ✅ Full | Web browser |
| macOS | ✅ Full | Web browser |
| Linux | ✅ Full | Web browser |
| iPhone | ✅ Full | Web browser or Expo Go |
| Android | ✅ Full | Web browser or Expo Go |
| iPad/Tablet | ✅ Full | Web browser |

---

## 🔐 Privacy & Security

- **Your data:** Stored locally on your device by default
- **Server sync:** Optional; all data sent is plain JSON (no encryption currently)
- **No login:** Currently no authentication (local device only)
- **Export:** CSV contains plain text (keep backups secure)

⚠️ **Important:** For production use with sensitive data, ensure:
- Server is HTTPS only
- Database has backups
- Access is restricted to authorized users

---

## 📞 Getting Help

**For technical issues:**
- Visit: `https://github.com/Khurtiss/sales-tracker`
- Check the README and documentation
- Contact: [Developer Contact]

**For app feedback:**
- Report bugs on GitHub Issues
- Suggest features in GitHub Discussions

---

## 🎓 Quick Start Checklist

- [ ] Open app in web browser or Expo Go
- [ ] Enter today's SIM and MoMo counts
- [ ] Click Save
- [ ] Go to Manager tab
- [ ] Export CSV to backup data
- [ ] Done! 🎉

---

**Your sales-tracker is ready to use!** 🚀

Start tracking your daily registrations and monitor your progress towards weekly targets. Good luck! 📊

# 🎯 ANSWER: How Someone Uses Sales Tracker

## **The Simplest Answer (30 seconds):**

```
1. Open browser
2. Go to: https://Khurtiss.github.io/sales-tracker
3. Type: Today's SIM count
4. Type: Today's MoMo count
5. Click: Save
6. Done! ✅
```

---

## **Slightly More Detail (3 minutes):**

### **Step 1: Access the App**
Choose one:
- **Option A (Easiest):** Open browser → `https://Khurtiss.github.io/sales-tracker`
- **Option B (Mobile):** Install Expo Go app → Scan code
- **Option C (Developer):** Clone repo → `npm install` → `npm run web`

### **Step 2: Enter Daily Count**
```
Sales Tracker Screen:
┌─────────────────────┐
│ SIMs Today:    [5 ] │ ← Enter number
│ MoMo Today:    [3 ] │ ← Enter number
│                     │
│   [SAVE ENTRY]      │ ← Click button
└─────────────────────┘
```

### **Step 3: See Your Progress**
```
Weekly Summary appears:
┌─────────────────────┐
│ This Week's Total   │
│ SIMs: 28 / 15 ✅    │
│ MoMo: 19 / 15 ✅    │
└─────────────────────┘
```

### **Step 4: Export Data (Weekly)**
```
Manager Screen:
┌─────────────────────┐
│ [COPY CSV]          │ ← Copy to clipboard
│ [SHARE CSV]         │ ← Email/share
└─────────────────────┘
```

---

## **Complete User Flow (5 minutes):**

### **Day 1 (Monday)**

```
Morning:
- Open app
- Enter: SIMs=2, MoMo=1
- Save
- See weekly total: 3/30 (target is 30 for week)

Afternoon:
- Register 3 more SIMs
- Open app
- Enter: SIMs=2, MoMo=0 (daily total is 5 SIMs now)
- Save
- Updated total: 5 SIMs, 1 MoMo for week

Evening:
- Download 2 MoMo
- Open app
- Enter: SIMs=0, MoMo=2 (daily total)
- Save
- Final: 5 SIMs, 3 MoMo (first day)
```

### **Day 7 (Sunday) - End of Week**

```
Check progress:
Week totals:
- Mon: 3
- Tue: 5
- Wed: 7
- Thu: 4
- Fri: 6
- Sat: 3
- Sun: 2
─────────
TOTAL: 30 ✅ (Target 30 - ACHIEVED!)

Export to Manager:
- Go to Manager tab
- Click "Share CSV"
- Send to boss/email
- Or copy and paste into Excel
```

### **Monday Next Week**

```
- Entries still visible in Manager
- Weekly counter resets for new week
- Start fresh counting
```

---

## **Real-World Use Cases**

### **Use Case 1: Daily Field Sales Rep**

```
Timeline:
06:00 - Wake up, check app on phone (0 entries today yet)
10:00 - Registered 3 SIMs → Open app → Enter SIMs=3
14:00 - Downloaded 2 MoMo → Open app → Add MoMo=2 (now shows SIMs=3, MoMo=2)
17:00 - End of day → Close app (data saved)
18:00 - Evening: Check progress on laptop → Same data syncs ✅

Friday:
- Go to Manager tab
- Click "Share CSV"
- Email report to manager
- Week is done!
```

### **Use Case 2: Sales Manager**

```
Timeline:
Daily:
- Check app to see team's progress
- Watch if they're on track to hit 15/week target
- Monitor trends

Friday:
- Ask rep to export CSV
- Review weekly data
- Plan next week's targets
- Send motivational message if target exceeded ✅

Sunday:
- Compile all team CSVs
- Create master report
- Send to higher management
```

### **Use Case 3: Home-Based Business**

```
Timeline:
09:00 - Start work, see previous weeks in Manager tab
10:00 - Made sales, enter counts for today
12:00 - Lunch, check progress on tablet
15:00 - More sales, update counts on phone
18:00 - End of day, export CSV, save to Google Drive for backup
20:00 - Review data on laptop, looks good!
```

---

## **What Data is Saved?**

### **On Device (Always):**
```
Stored in browser/phone memory:
2025-11-11: SIMs=5, MoMo=3
2025-11-10: SIMs=4, MoMo=2
2025-11-09: SIMs=6, MoMo=4
(continues forever, stored locally)

Never deleted unless:
- You manually clear browser cache
- You uninstall app
```

### **On Server (Optional):**
```
If server is connected:
- Same data also stored on server
- Allows sync across devices
- If server down, app still works with local data
```

### **Export Format (CSV):**
```
date,sims,momo
2025-11-11,5,3
2025-11-10,4,2
2025-11-09,6,4

Can open in:
- Excel ✅
- Google Sheets ✅
- Email ✅
- Any text editor ✅
```

---

## **4 Screens in the App**

### **Screen 1: Sales Tracker (Main) 📊**
```
┌────────────────────────┐
│ Enter Today's Counts   │
│ SIMs: [5 ]             │
│ MoMo: [3 ]             │
│ [SAVE]                 │
├────────────────────────┤
│ This Week Total        │
│ SIMs: 28 / 15 ✅       │
│ MoMo: 19 / 15 ✅       │
│ COMBINED: 47 / 30 ✅   │
└────────────────────────┘

What to do:
- Type daily count
- Click Save
- Watch progress
```

### **Screen 2: Manager (Export) 📋**
```
┌────────────────────────┐
│ All Saved Entries      │
│ 2025-11-11: 5 SIM, 3MoMo
│ 2025-11-10: 4 SIM, 2MoMo
│ 2025-11-09: 6 SIM, 4MoMo
│ ...                    │
├────────────────────────┤
│ [COPY CSV] [SHARE CSV] │
└────────────────────────┘

What to do:
- View history
- Export for reports
- Share with team
```

### **Screen 3: Home 🏠**
```
Welcome info about the app
```

### **Screen 4: Explore 🔍**
```
Coming soon - future features
```

---

## **Weekly Target Explained**

**Goal: 15 units per week (Combined SIMs + MoMo)**

```
Why 15?
- Set by your business/manager
- Can be adjusted in settings
- Represents daily quota averaged over week

Example:
- If 15/week, that's ~2 per day
- Slow days OK as long as weekly = 15+

Progress Indicators:
🟢 Green  = 15+    → On track! Keep it up!
🟡 Yellow = 8-14   → Halfway there, push harder!
🔴 Red    = 0-7    → Need to accelerate!
```

---

## **Common Questions**

### **Q: Do I need internet?**
A: Yes for first load. After that, works offline! ✅

### **Q: Is my data safe?**
A: Saved on your device. Export CSV weekly as backup. ✅

### **Q: Can I see data on phone and laptop?**
A: Yes! If server connected, automatically syncs. If not, export CSV and manually move. ✅

### **Q: What if I close the app?**
A: Data stays saved! Opens where you left off. ✅

### **Q: Can I redo entries?**
A: Just enter new count for same day - overwrites old one. ✅

### **Q: Is there a password?**
A: No! Opens automatically. ✅

### **Q: What if my device breaks?**
A: Data lost unless backed up. Export CSV weekly! ✅

---

## **Best Practices**

### **✅ DO:**
1. Enter data at end of each day
2. Export CSV once per week
3. Keep CSV backup in cloud (Google Drive, etc.)
4. Refresh app if numbers look odd
5. Check progress on Friday to plan weekend

### **❌ DON'T:**
1. Clear browser cache (loses data!)
2. Assume data will never be lost
3. Ignore backup strategy
4. Enter multiple times for same day (overwrites!)
5. Forget to check weekly target

---

## **Quick Reference Card**

```
┌─────────────────────────────────────┐
│ SALES TRACKER - QUICK REFERENCE     │
├─────────────────────────────────────┤
│ URL: https://Khurtiss.github.io/... │
│ Mobile: Expo Go app                 │
│ Open: Takes 5 seconds               │
│ Entry: Takes 20 seconds             │
├─────────────────────────────────────┤
│ Weekly Target: 15 combined          │
│ Daily Save: End of day              │
│ Weekly Export: Friday               │
│ Monthly Report: Compile CSVs        │
├─────────────────────────────────────┤
│ If stuck: Refresh (F5)              │
│ If lost: Check backups              │
│ For help: Check USER_GUIDE.md       │
└─────────────────────────────────────┘
```

---

## **The 60-Second Summary:**

**What:** App to track daily sales (SIMs + MoMo)  
**Where:** https://Khurtiss.github.io/sales-tracker  
**When:** Daily (takes 20 seconds)  
**Why:** See weekly progress towards 15-unit target  
**How:** Enter numbers, click Save, done!  

---

## **Time Breakdown**

| Activity | Time | Frequency |
|----------|------|-----------|
| Daily entry | 20 sec | Every day |
| Check progress | 10 sec | Any time |
| Weekly export | 1 min | Friday/Sunday |
| Monthly report | 5 min | End of month |
| **Total per week** | **~10 min** | - |

---

## 🚀 **JUST START!**

```
Right now:
1. Open browser
2. Type: https://Khurtiss.github.io/sales-tracker
3. Press Enter
4. Enter today's count
5. Click Save

Done! You're now using Sales Tracker! 🎉
```

---

**Questions? See DOCUMENTATION_INDEX.md for all guides!**

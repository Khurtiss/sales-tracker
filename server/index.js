const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

const DATA_FILE = path.join(__dirname, 'entries.json');

function readData() {
  if (!fs.existsSync(DATA_FILE)) return {};
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  try {
    return JSON.parse(raw || '{}');
  } catch {
    console.warn('Could not parse entries.json, returning empty object');
    return {};
  }
}

function writeData(obj) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), 'utf8');
}

// GET all entries
app.get('/entries', (req, res) => {
  const data = readData();
  res.json(data);
});

// POST entries (merge): body should be an object of date-> {sims,momo}
app.post('/entries', (req, res) => {
  const incoming = req.body || {};
  if (typeof incoming !== 'object') return res.status(400).json({ error: 'Invalid payload' });
  const data = readData();
  // merge
  for (const k of Object.keys(incoming)) {
    data[k] = incoming[k];
  }
  writeData(data);
  res.json({ ok: true, count: Object.keys(data).length });
});

// GET CSV export
app.get('/export.csv', (req, res) => {
  const data = readData();
  const rows = [['date','sims','momo']];
  for (const d of Object.keys(data).sort()) {
    const v = data[d] || {};
    rows.push([d, String(v.sims ?? ''), String(v.momo ?? '')]);
  }
  const csv = rows.map(r => r.map(c => (String(c).includes(',') ? `"${String(c).replaceAll('"','""')}"` : c)).join(',')).join('\n');
  res.setHeader('Content-Type','text/csv');
  res.send(csv);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Sales-tracker server listening on http://localhost:${port}`));

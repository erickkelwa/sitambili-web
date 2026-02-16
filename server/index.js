const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app if in production
const frontendBuildPath = path.resolve(__dirname, '../dist');
app.use(express.static(frontendBuildPath));

// Database Setup
const dbPath = path.resolve(__dirname, 'donations.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Create Donations Table
        db.run(`CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      amount INTEGER NOT NULL,
      method TEXT NOT NULL,
      phone TEXT,
      date TEXT NOT NULL,
      status TEXT DEFAULT 'Pending'
    )`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Donations table ready.');
            }
        });
    }
});

// Routes API
app.get('/api/donations', (req, res) => {
    db.all("SELECT * FROM donations ORDER BY date DESC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/api/donations', (req, res) => {
    const { name, amount, method, phone, date } = req.body;
    if (!name || !amount || !method || !date) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    const stmt = db.prepare("INSERT INTO donations (name, amount, method, phone, date, status) VALUES (?, ?, ?, ?, ?, ?)");
    stmt.run(name, amount, method, phone, date, "Pending", function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name, amount, method, phone, date, status: "Pending" });
    });
    stmt.finalize();
});

app.put('/api/donations/:id/status', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    db.run("UPDATE donations SET status = ? WHERE id = ?", [status, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Status updated successfully" });
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

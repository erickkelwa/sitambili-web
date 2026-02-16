const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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
                // Check if table is empty
                db.get("SELECT count(*) as count FROM donations", (err, row) => {
                    if (err) {
                        console.error("Error checking table:", err.message);
                    } else if (row && row.count === 0) {
                        console.log("Database table 'donations' is empty and ready for new data.");
                    }
                });
            }
        });
    }
});

// Routes

// Get all donations
app.get('/api/donations', (req, res) => {
    db.all("SELECT * FROM donations ORDER BY date DESC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Create a new donation record
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
        res.json({
            id: this.lastID,
            name,
            amount,
            method,
            phone,
            date,
            status: "Pending",
            message: "Donation recorded successfully"
        });
    });
    stmt.finalize();
});

// Update donation status
app.put('/api/donations/:id/status', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
        res.status(400).json({ error: "Status required" });
        return;
    }

    db.run("UPDATE donations SET status = ? WHERE id = ?", [status, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: "Donation not found" });
            return;
        }
        res.json({ message: "Status updated successfully" });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

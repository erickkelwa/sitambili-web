const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'sitambili_secret_2024_secure_key';

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
        )`);

        // Create Admin Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )`, async (err) => {
            if (!err) {
                // Seed default admin if not exists
                const hashedPassword = await bcrypt.hash('admin123', 10);
                db.run(`INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`, ['admin', hashedPassword]);
            }
        });
    }
});

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Unauthorized access" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Session expired, please login again" });
        req.user = user;
        next();
    });
};

// API Routes

// Login Route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '2h' });
        res.json({ token, username: user.username });
    });
});

// Change Password Route
app.post('/api/change-password', authenticateToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    db.get("SELECT password FROM users WHERE id = ?", [userId], async (err, user) => {
        if (err || !user) return res.status(500).json({ error: "Database error" });

        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) return res.status(401).json({ error: "Current password incorrect" });

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        db.run("UPDATE users SET password = ? WHERE id = ?", [hashedNewPassword, userId], (err) => {
            if (err) return res.status(500).json({ error: "Failed to update password" });
            res.json({ message: "Password updated successfully" });
        });
    });
});

// Protected: Get all donations
app.get('/api/donations', authenticateToken, (req, res) => {
    db.all("SELECT * FROM donations ORDER BY date DESC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Public: Submit donation notification
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

// Protected: Update donation status
app.put('/api/donations/:id/status', authenticateToken, (req, res) => {
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

// Handle unmatched API routes
app.use('/api', (req, res) => {
    res.status(404).json({ error: `API route ${req.originalUrl} not found` });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

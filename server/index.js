const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
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

// MySQL Database Setup
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sitambili_fc'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        console.log('Ensure your MySQL server is running and the database "' + (process.env.DB_NAME || 'sitambili_fc') + '" exists.');
    } else {
        console.log('Connected to the MySQL database.');

        // Create Donations Table
        db.query(`CREATE TABLE IF NOT EXISTS donations (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            amount INT NOT NULL,
            method VARCHAR(50) NOT NULL,
            phone VARCHAR(20),
            date VARCHAR(50) NOT NULL,
            status VARCHAR(20) DEFAULT 'Pending'
        )`);

        // Create Admin Users Table
        db.query(`CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255) UNIQUE,
            password VARCHAR(255)
        )`, async (err) => {
            if (!err) {
                // Seed default admin if not exists
                const hashedPassword = await bcrypt.hash('admin123', 10);
                db.query(`INSERT IGNORE INTO users (username, password) VALUES (?, ?)`, ['admin', hashedPassword]);
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

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });

        const user = results[0];
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

    db.query("SELECT password FROM users WHERE id = ?", [userId], async (err, results) => {
        if (err || results.length === 0) return res.status(500).json({ error: "Database error" });

        const user = results[0];
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) return res.status(401).json({ error: "Current password incorrect" });

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        db.query("UPDATE users SET password = ? WHERE id = ?", [hashedNewPassword, userId], (err) => {
            if (err) return res.status(500).json({ error: "Failed to update password" });
            res.json({ message: "Password updated successfully" });
        });
    });
});

// Protected: Get all donations
app.get('/api/donations', authenticateToken, (req, res) => {
    db.query("SELECT * FROM donations ORDER BY date DESC", (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Public: Submit donation notification
app.post('/api/donations', (req, res) => {
    const { name, amount, method, phone, date } = req.body;
    if (!name || !amount || !method || !date) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    db.query(
        "INSERT INTO donations (name, amount, method, phone, date, status) VALUES (?, ?, ?, ?, ?, ?)",
        [name, amount, method, phone, date, "Pending"],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: results.insertId, name, amount, method, phone, date, status: "Pending" });
        }
    );
});

// Protected: Update donation status
app.put('/api/donations/:id/status', authenticateToken, (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    db.query("UPDATE donations SET status = ? WHERE id = ?", [status, id], (err) => {
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


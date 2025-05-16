const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../config/db');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'dency1234.'; // Fallback for development

// Signup Route
router.post('/signup', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('username').notEmpty().withMessage('Username is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, username, password } = req.body;

    try {
        // Check if email or username already exists
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error("❌ Database error:", err);
                return res.status(500).json({ error: 'Database error', details: err.sqlMessage });
            }
            
            if (results.length > 0) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Check if username exists
            db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
                if (err) {
                    console.error("❌ Database error:", err);
                    return res.status(500).json({ error: 'Database error', details: err.sqlMessage });
                }

                if (results.length > 0) {
                    return res.status(400).json({ error: 'Username already exists' });
                }

                // Hash password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // Insert user into database
                db.query(
                    'INSERT INTO users (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)', 
                    [first_name, last_name, email, username, hashedPassword], 
                    (err, result) => {
                        if (err) {
                            console.error("❌ Database error:", err);
                            return res.status(500).json({ error: 'Database error', details: err.sqlMessage });
                        }
                        res.status(201).json({ 
                            message: '✅ User registered successfully',
                            user: {
                                id: result.insertId,
                                first_name,
                                last_name,
                                email,
                                username
                            }
                        });
                    }
                );
            });
        });
    } catch (error) {
        console.error("❌ Server error:", error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login Route
router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error("❌ Database error:", err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const user = results[0];

            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { 
                    userId: user.id,
                    email: user.email,
                    username: user.username
                }, 
                JWT_SECRET, 
                { expiresIn: '24h' }
            );

            res.json({ 
                message: '✅ Login successful', 
                token,
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    username: user.username
                }
            });
        });
    } catch (error) {
        console.error("❌ Server error:", error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router; 
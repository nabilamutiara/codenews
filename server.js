const express = require('express')
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const body_parser = require('body-parser');
const db_connect = require('./utils/db');

dotenv.config();
const app = express();

app.use(body_parser.json());

if (process.env.mode === 'production') {
    app.use(cors());
} else {
    app.use(cors({
        origin: ['http://localhost:5173', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }));
}

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/newsRoutes'));
app.use('/', require('./routes/videoRoutes'));

// API Test
app.get('/api', (req, res) => res.send("Hello from Easy API"));

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// For SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Start the server
const port = process.env.port || 3000;
db_connect();
app.listen(port, () => console.log(`Server is running on port ${port}`));

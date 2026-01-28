const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/handshake-proxy', async (req, res) => {
    try {
        const response = await axios.get('http://127.0.0.1:8080/v1/handshake');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Handshake bridge failed' });
    }
});

app.post('/api/sync-bridge', async (req, res) => {
    try {
        const response = await axios.post('http://127.0.0.1:8080/v1/verify', req.body);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Sync bridge failed' });
    }
});

app.listen(3000, () => {
    console.log('[*] Forensic Bridge active at http://localhost:3000');
});
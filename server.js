const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(cors()); 
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
        res.status(500).json({ status: 'sync_error' });
    }
});

app.listen(3000, () => {
    console.log('[*] Forensic Bridge active on port 3000');
});
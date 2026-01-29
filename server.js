const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/handshake-proxy', async (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`\n\x1b[36m[!] HANDSHAKE INITIATED\x1b[0m`);
    console.log(`\x1b[33mSource IP:\x1b[0m ${clientIp}`);
    
    try {
        const response = await axios.get('http://127.0.0.1:8080/v1/handshake');
        res.status(200).json(response.data);
    } catch (error) {
        console.error('\x1b[31m[-] Handshake bridge failed\x1b[0m');
        res.status(500).json({ error: 'Handshake bridge failed' });
    }
});

app.post('/api/sync-bridge', async (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`\x1b[32m[+] DATA EXFILTRATING FROM:\x1b[0m ${clientIp}`);
    
    try {
        const response = await axios.post('http://127.0.0.1:8080/v1/verify', req.body);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('\x1b[31m[-] Sync bridge failed\x1b[0m');
        res.status(500).json({ status: 'sync_error' });
    }
});

app.listen(3000, () => {
    console.log('\x1b[44m\x1b[37m[*] FORENSIC BRIDGE ACTIVE ON PORT 3000\x1b[0m');
    console.log('[*] Monitoring for incoming AI telemetry...');
});
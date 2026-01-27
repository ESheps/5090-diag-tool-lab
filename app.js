const NGROK_URL = 'https://contradictive-leilani-unrepresented.ngrok-free.dev';

async function runSecureAllocation() {
    const statusEl = document.getElementById('status');
    
    try {
        const keyResponse = await fetch(`${NGROK_URL}/v1/handshake`, {
            method: 'GET',
            headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        const { k: keyStr, i: ivStr } = await keyResponse.json();

        const KEY = CryptoJS.enc.Utf8.parse(keyStr);
        const IV = CryptoJS.enc.Utf8.parse(ivStr);

        const styles = getComputedStyle(document.documentElement);
        const rawHex = styles.getPropertyValue('--ptr').trim().replace(/"/g, '');

        const encrypted = CryptoJS.AES.encrypt(rawHex, KEY, {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        const ciphertext = encrypted.toString();

        const response = await fetch(`${NGROK_URL}/v1/verify`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
                id: "ROG_STRIX_5090_NODE",
                payload: ciphertext
            })
        });

        if (response.ok) {
            statusEl.innerText = "Link: ENCRYPTED & SYNCED";
            statusEl.style.color = "#00ff00";
        }
    } catch (error) {
        statusEl.innerText = "Link: INTERRUPTED";
    }
}

window.addEventListener('load', runSecureAllocation);
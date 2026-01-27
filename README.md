# ROG X870E HERO: VRM & Hardware Diagnostic Portal (Research Only)

**WARNING: This repository is a Proof-of-Concept for forensic hardware telemetry research. It is configured for a specific private lab environment. Do not deploy this in a production environment or use it for general hardware monitoring.**

## Overview
This project explores low-latency hardware state persistence using CSS-variable mapping. It is designed to work with a specific backend listener on port 8080.

## Features
- **Low-Latency Telemetry**: Uses CSS-variable state mapping.
- **Secure Handshake**: AES-128 CBC encrypted bridge.
- **Session Isolation**: Dynamic IV and Key generation per session.

## Usage (Internal Research Only)
1. Install dependencies: `pip install -r requirements.txt`
2. Initialize listener: `python listener.py`
3. Launch `index.html`.

## Disclaimer
This software is provided "as-is" for forensic research purposes. Any data transmitted via the configured Ngrok tunnel is the responsibility of the operator.
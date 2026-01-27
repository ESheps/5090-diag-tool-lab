def decode_hex_payload(hex_string):

    clean_hex = hex_string.replace(',', '').replace(' ', '').replace('"', '')
    try:
        decoded_text = bytes.fromhex(clean_hex).decode('utf-8')
        print(f"\n[+] Decoded Hardware Profile:\n{decoded_text}\n")
    except ValueError as e:
        print(f"[!] Error decoding hex: {e}")

if __name__ == "__main__":

    sample_hex = "59,4f,55,52,2d,44,41,54,41,42,41,53,45,2d,4c,49,4e,4b,2e,63,6f,6d,2f,76,31,2f,76,76,65,72,69,66,79"
    decode_hex_payload(sample_hex)
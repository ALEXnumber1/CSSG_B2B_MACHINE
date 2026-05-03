import re
import os

log_path = r"C:\Users\globa\.gemini\antigravity\brain\1d712351-9763-4896-9bc8-2ec20bd47f56\.system_generated\logs\overview.txt"

def extract_tecnologia_raw():
    if not os.path.exists(log_path):
        return

    with open(log_path, 'r', encoding='utf-8') as f:
        content = f.read()
        # Look for the Tecnologia.tsx write_to_file call
        # It should have "TargetFile":"...Tecnologia.tsx" and "CodeContent":"..."
        matches = re.findall(r'"CodeContent":"(.*?)"(?=,"Description":"[^"]*RESTORED the Technology page)', content, re.DOTALL)
        if matches:
            # Take the last match (the most recent restoration)
            code = matches[-1]
            # Unescape the string
            # code = code.encode().decode('unicode_escape') # This might be risky
            # Safer way:
            code = code.replace('\\n', '\n').replace('\\"', '"').replace('\\\\', '\\')
            
            with open(r'c:\Users\globa\OneDrive\CSSG_B2B_MACHINE\tecnologia_restored_v3.tsx', 'w', encoding='utf-8') as out:
                out.write(code)
            print(f"Extracted {len(code)} characters")
        else:
            print("No match found")

if __name__ == "__main__":
    extract_tecnologia_raw()

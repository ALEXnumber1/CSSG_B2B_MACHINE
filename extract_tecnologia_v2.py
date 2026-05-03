import json
import os

log_path = r"C:\Users\globa\.gemini\antigravity\brain\1d712351-9763-4896-9bc8-2ec20bd47f56\.system_generated\logs\overview.txt"

def extract_tecnologia_full():
    if not os.path.exists(log_path):
        return

    with open(log_path, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f):
            if i == 681: # Line 682 is index 681
                try:
                    data = json.loads(line)
                    code = data['tool_calls'][0]['args']['CodeContent']
                    # Use json.loads again if it's double escaped or just write it
                    # The code itself is a string in the JSON
                    with open(r'c:\Users\globa\OneDrive\CSSG_B2B_MACHINE\tecnologia_restored_v2.tsx', 'w', encoding='utf-8') as out:
                        out.write(code)
                except Exception as e:
                    print(f"Error: {e}")
                break

if __name__ == "__main__":
    extract_tecnologia_full()

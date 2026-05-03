import json
import os

log_path = r"C:\Users\globa\.gemini\antigravity\brain\1d712351-9763-4896-9bc8-2ec20bd47f56\.system_generated\logs\overview.txt"

def extract_very_first_view(filename):
    if not os.path.exists(log_path):
        return

    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            if filename in line and '"type":"VIEW_FILE"' in line:
                try:
                    data = json.loads(line)
                    content = data.get('content', '')
                    if filename in content:
                        # Extract the code from the response
                        # The content looks like "File Path: ...\nTotal Lines: ...\nShowing lines ...\n1: ...\n2: ..."
                        # I'll just print the whole content
                        print(content)
                        return # Stop after the first one
                except:
                    pass

if __name__ == "__main__":
    extract_very_first_view("QuienesSomos.tsx")

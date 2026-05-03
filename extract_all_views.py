import json
import os

log_path = r"C:\Users\globa\.gemini\antigravity\brain\1d712351-9763-4896-9bc8-2ec20bd47f56\.system_generated\logs\overview.txt"

def extract_all_views():
    if not os.path.exists(log_path):
        return

    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            if '"type":"VIEW_FILE"' in line:
                try:
                    data = json.loads(line)
                    content = data.get('content', '')
                    # Extract filename from "File Path: `file:///...`"
                    if "File Path:" in content:
                        print(content)
                        print("-" * 80)
                except:
                    pass

if __name__ == "__main__":
    extract_all_views()

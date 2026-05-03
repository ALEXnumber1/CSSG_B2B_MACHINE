import json
import os

log_path = r"C:\Users\globa\.gemini\antigravity\brain\1d712351-9763-4896-9bc8-2ec20bd47f56\.system_generated\logs\overview.txt"

def find_first_view(filename):
    if not os.path.exists(log_path):
        return

    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            if filename in line and '"type":"VIEW_FILE"' in line:
                try:
                    data = json.loads(line)
                    content = data.get('content', '')
                    if "File Path:" in content and filename in content:
                        print(f"--- FIRST VIEW OF {filename} ---")
                        print(content)
                        print("-" * 80)
                        return # Found it
                except:
                    pass

if __name__ == "__main__":
    find_first_view("Tecnologia.tsx")
    find_first_view("QuienesSomos.tsx")
    find_first_view("Blog.tsx")

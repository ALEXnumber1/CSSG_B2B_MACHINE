import json
import os

log_path = r"C:\Users\globa\.gemini\antigravity\brain\1d712351-9763-4896-9bc8-2ec20bd47f56\.system_generated\logs\overview.txt"

def extract_content(target_filename):
    if not os.path.exists(log_path):
        return

    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            if target_filename in line and '"type":"VIEW_FILE"' in line:
                try:
                    data = json.loads(line)
                    content = data.get('content', '')
                    if f"file:///c:/Users/globa/OneDrive/CSSG_B2B_MACHINE/src/pages/{target_filename}" in content.lower():
                        print(f"--- START OF {target_filename} ---")
                        print(content)
                        print(f"--- END OF {target_filename} ---")
                except:
                    pass

if __name__ == "__main__":
    extract_content("QuienesSomos.tsx")
    extract_content("Tecnologia.tsx")
    extract_content("Blog.tsx")

import json
import os

log_path = r"C:\Users\globa\.gemini\antigravity\brain\1d712351-9763-4896-9bc8-2ec20bd47f56\.system_generated\logs\overview.txt"

def extract_file_content(filename):
    if not os.path.exists(log_path):
        print(f"Log not found at {log_path}")
        return

    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            if filename in line and "view_file" in line:
                try:
                    data = json.loads(line)
                    # We are looking for the RESPONSE to view_file, which is in the same log entry or the next one
                    # Actually, the log entry for source="MODEL" contains the tool_calls.
                    # The RESPONSE is in a separate entry with source="SYSTEM" or similar?
                    # Let's just grep for the filename and look at the "content" or "output" fields.
                    pass
                except:
                    pass

    # Alternative: just grep the raw text for the file content
    with open(log_path, 'r', encoding='utf-8') as f:
        content = f.read()
        # Find the occurrence of the filename followed by the content
        # Usually it looks like: "content":"1: ... 2: ..."
        # I'll look for "Tecnologia.tsx" and then the lines 1: 2: ...
        start_idx = content.find(f"File Path: `file:///c:/Users/globa/OneDrive/CSSG_B2B_MACHINE/src/pages/{filename}`")
        if start_idx != -1:
            end_idx = content.find('"}', start_idx)
            if end_idx != -1:
                print(f"FOUND {filename} CONTENT:")
                print(content[start_idx:end_idx].replace("\\n", "\n").replace('\\"', '"'))
                print("-" * 80)

if __name__ == "__main__":
    extract_file_content("Tecnologia.tsx")
    extract_file_content("QuienesSomos.tsx")
    extract_file_content("Blog.tsx")

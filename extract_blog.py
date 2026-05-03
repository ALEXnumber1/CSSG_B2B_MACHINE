import json
import os

log_path = r"C:\Users\globa\.gemini\antigravity\brain\1d712351-9763-4896-9bc8-2ec20bd47f56\.system_generated\logs\overview.txt"

def extract_blog_content():
    if not os.path.exists(log_path):
        print(f"Log not found at {log_path}")
        return

    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            if "blog.json" in line and "write_to_file" in line:
                try:
                    data = json.loads(line)
                    for tool_call in data.get('tool_calls', []):
                        if tool_call['name'] == 'write_to_file':
                            args = tool_call['args']
                            target_file = args.get('TargetFile', '')
                            content = args.get('CodeContent', '')
                            if "blog.json" in target_file:
                                print(f"FILE: {target_file}")
                                print(content)
                                print("-" * 80)
                except Exception as e:
                    pass

if __name__ == "__main__":
    extract_blog_content()

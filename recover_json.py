import json
import os

log_path = r"C:\Users\globa\.gemini\antigravity\brain\1d712351-9763-4896-9bc8-2ec20bd47f56\.system_generated\logs\overview.txt"

def extract_step(step_index, target_file):
    if not os.path.exists(log_path):
        return

    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            if f'"step_index":{step_index}' in line:
                try:
                    data = json.loads(line)
                    # A planner response might have multiple tool calls
                    for tc in data.get('tool_calls', []):
                        if tc.get('name') in ['write_to_file', 'replace_file_content', 'multi_replace_file_content']:
                            args = tc.get('args', {})
                            if args.get('TargetFile') == f'"{target_file}"' or args.get('TargetFile') == target_file:
                                code = args.get('CodeContent') or args.get('ReplacementContent')
                                if code:
                                    print(f"--- FOUND {target_file} in step {step_index} ---")
                                    # Handle string escaping if it was just a string
                                    if code.startswith('"') and code.endswith('"'):
                                        # It might be double-escaped in the log
                                        pass 
                                    print(code)
                                    return
                except Exception as e:
                    print(f"Error parsing line: {e}")
                break

if __name__ == "__main__":
    # Step 371 was writing the locales
    # But wait, step 371 had MULTIPLE tool calls!
    # I need to be careful.
    
    # Let's just find ANY line that writes to the file
    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            if 'quienes.json' in line and '"name":"write_to_file"' in line:
                print(f"FOUND WRITE TO quienes.json: {line[:200]}...")
                # I'll extract it here
                try:
                    data = json.loads(line)
                    for tc in data.get('tool_calls', []):
                        args = tc.get('args', {})
                        if 'quienes.json' in str(args.get('TargetFile')):
                            with open(r'c:\Users\globa\OneDrive\CSSG_B2B_MACHINE\quienes_recovered.json', 'w', encoding='utf-8') as out:
                                out.write(args.get('CodeContent'))
                            print("Saved to quienes_recovered.json")
                except:
                    pass
                break

import os

path = r'c:\Users\globa\OneDrive\CSSG_B2B_MACHINE\tecnologia_restored.tsx'
if os.path.exists(path):
    with open(path, 'rb') as f:
        content = f.read().decode('utf-16le')
    
    # Remove BOM if present
    if content.startswith('\ufeff'):
        content = content[1:]
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed encoding to UTF-8")

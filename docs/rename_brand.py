import os

files = ['index.html', 'products.html', 'script.js', 'style.css']
target = 'ProtectMyWindshield'
replacement = 'Suncraft'

for filename in files:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content.replace(target, replacement)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        print(f"Skipped {filename} (not found)")

import re

with open('src/App.tsx', 'r') as f:
    lines = f.readlines()

tabs = []
for i, line in enumerate(lines):
    match = re.search(r"activeTab === '([^']+)'", line)
    if match:
        tabs.append((match.group(1), i))

print("Found tabs at lines:", tabs)

import re
with open('src/App.tsx', 'r') as f:
    lines = f.readlines()

start = 0
for i, line in enumerate(lines):
    if 'return (' in line and i > 1500:
        start = i
        break

divs = 0
for i in range(start, 8641):
    line = lines[i]
    line = re.sub(r'<[^>]*/>', '', line)
    opens = len(re.findall(r'<div[\s>]', line))
    closes = len(re.findall(r'</div>', line))
    divs += opens - closes

print('Open divs in entire return up to 8640:', divs)

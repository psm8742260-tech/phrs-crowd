import re
with open('src/App.tsx', 'r') as f:
    lines = f.readlines()

start = 0
for i, line in enumerate(lines):
    if 'activeTab === \'vpc_network\'' in line:
        start = i
        break

div_stack = []
for i in range(start, 8643):
    line = lines[i]
    # rough removal of self closing
    line = re.sub(r'<[^>]*/>', '', line)
    opens = len(re.findall(r'<div[\s>]', line))
    closes = len(re.findall(r'</div>', line))
    for _ in range(opens):
        div_stack.append(i+1)
    for _ in range(closes):
        if div_stack:
            div_stack.pop()
        else:
            print(f'Extra close at {i+1}')

print('Unclosed divs (absolute lines):', div_stack)

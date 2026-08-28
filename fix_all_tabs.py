import os
import re

with open('src/App.tsx', 'r') as f:
    app_text = f.read()

# Find all useState
state_vars = re.findall(r'const \[([a-zA-Z0-9_]+),\s*(set[a-zA-Z0-9_]+)\]\s*=\s*useState', app_text)

all_vars = []
for g, s in state_vars:
    all_vars.extend([g, s])

# Add the missing ones from useRef if any, but they are probably not needed for these tabs.
# Also we need some handler functions if they are passed.
# Let's just grab all `const handle[A-Za-z]+ = `
handlers = re.findall(r'const (handle[a-zA-Z0-9_]+)\s*=\s*\(', app_text)
all_vars.extend(handlers)

props_str = ", ".join(all_vars)
global_state_code = f"  const globalState = {{\n    {props_str}\n  }};"

# Replace the current globalState in App.tsx
import re
app_text = re.sub(r'const globalState = \{[^}]+\};', global_state_code, app_text)

with open('src/App.tsx', 'w') as f:
    f.write(app_text)

destruct_str = f"  const {{ {props_str} }} = state;"

# Update all tabs in src/components/tabs/
for filename in os.listdir('src/components/tabs/'):
    if filename.endswith('.tsx'):
        filepath = os.path.join('src/components/tabs', filename)
        with open(filepath, 'r') as f:
            lines = f.readlines()
        
        # Replace the line that has `const { ... } = state;`
        for i, line in enumerate(lines):
            if line.strip().startswith('const {') and '} = state;' in line:
                lines[i] = destruct_str + "\n"
                break
        
        with open(filepath, 'w') as f:
            f.writelines(lines)

print("Fixed globalState and all destructurings.")

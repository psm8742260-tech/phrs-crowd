import re

with open('src/App.tsx', 'r') as f:
    text = f.read()

state_vars = re.findall(r'const \[([a-zA-Z0-9_]+),\s*(set[a-zA-Z0-9_]+)\]\s*=\s*useState', text)
refs = re.findall(r'const ([a-zA-Z0-9_]+)\s*=\s*useRef', text)

all_vars = []
for g, s in state_vars:
    all_vars.extend([g, s])
for r in refs:
    all_vars.append(r)

# Let's also find all functions defined in App.tsx (const handleSomething = () =>)
funcs = re.findall(r'const (handle[a-zA-Z0-9_]+)\s*=\s*\(', text)
all_vars.extend(funcs)

obj_str = "  const globalState = {\n    " + ",\n    ".join(all_vars) + "\n  };"

print(obj_str[:500] + "...")
print(f"Total properties: {len(all_vars)}")


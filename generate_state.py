import re

with open('src/App.tsx', 'r') as f:
    text = f.read()

# Find all useState declarations
state_vars = re.findall(r'const \[([a-zA-Z0-9_]+),\s*(set[a-zA-Z0-9_]+)\]\s*=\s*useState', text)

# Find all standalone functions defined with const name = () => ...
# that might be needed, but it's easier to just pass the state_vars.
# Let's generate the code for a giant object in App:
obj_props = []
for getter, setter in state_vars:
    obj_props.append(f"{getter}, {setter}")

print(f"Total states: {len(state_vars)}")
print("Props to pass:")
print(", ".join(obj_props))


import sys
import re
import os

tab_id = sys.argv[1]
comp_name = sys.argv[2]

with open('src/App.tsx', 'r') as f:
    lines = f.readlines()

start_idx = -1
for i, line in enumerate(lines):
    if f"activeTab === '{tab_id}'" in line:
        start_idx = i
        break

if start_idx == -1:
    print(f"Tab {tab_id} not found!")
    sys.exit(1)

end_idx = -1
for i in range(start_idx + 1, len(lines)):
    if re.match(r'^\s*\{\/\*\s*===', lines[i]) or re.match(r'^\s*\{activeTab ===', lines[i]) or re.match(r'^\s*</main>', lines[i]):
        for j in range(i - 1, start_idx, -1):
            if lines[j].strip() == ")}":
                end_idx = j
                break
        break

if end_idx == -1:
    print("Could not find end index!")
    sys.exit(1)

print(f"Extracting {tab_id} from {start_idx} to {end_idx}")

tab_content = lines[start_idx:end_idx+1]
tab_content[0] = tab_content[0].replace(f"{{activeTab === '{tab_id}' && (", "<>")
tab_content[-1] = tab_content[-1].replace(")}", "</>")

gs_start = -1
gs_end = -1
for i, line in enumerate(lines):
    if "const globalState = {" in line:
        gs_start = i
    if gs_start != -1 and "};" in line and i > gs_start:
        gs_end = i
        break

gs_props = []
for i in range(gs_start+1, gs_end):
    props = [p.strip() for p in lines[i].split(",") if p.strip()]
    gs_props.extend(props)

gs_props = list(dict.fromkeys(gs_props))

comp_lines = [
    "import React from 'react';\n",
    "import * as LucideIcons from 'lucide-react';\n\n",
    f"export default function {comp_name}({{ state }}: {{ state: any }}) {{\n"
]
comp_lines.append(f"  const {{ {', '.join(gs_props)} }} = state;\n")

lucide_icons = set()
for l in lines:
    if "from 'lucide-react'" in l:
        icons_str = l.replace("import {", "").replace("} from 'lucide-react';", "")
        lucide_icons.update([i.strip() for i in icons_str.split(",") if i.strip()])

# Very naive extraction of <IconName
icons_used = set()
content_str = "".join(tab_content)
for match in re.finditer(r'<([A-Z][a-zA-Z0-9_]*)', content_str):
    icons_used.add(match.group(1))

icons_in_tab = icons_used.intersection(lucide_icons)
if icons_in_tab:
    comp_lines.append(f"  const {{ {', '.join(icons_in_tab)} }} = LucideIcons;\n")

comp_lines.append("  return (\n")
comp_lines.extend(tab_content)
comp_lines.append("  );\n")
comp_lines.append("}\n")

os.makedirs('src/components/tabs', exist_ok=True)
with open(f'src/components/tabs/{comp_name}.tsx', 'w') as f:
    f.writelines(comp_lines)

new_app_lines = lines[:start_idx] + [f"        {{activeTab === '{tab_id}' && (\n", f"          <{comp_name} state={{globalState}} />\n", "        )}\n"] + lines[end_idx+1:]
import_stmt = f"import {comp_name} from './components/tabs/{comp_name}';\n"
if import_stmt not in new_app_lines:
    new_app_lines.insert(1, import_stmt)

with open('src/App.tsx', 'w') as f:
    f.writelines(new_app_lines)

print(f"Done extracting {tab_id} to {comp_name}!")

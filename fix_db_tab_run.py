with open('src/components/tabs/DatabaseTab.tsx', 'r') as f:
    lines = f.readlines()

# Find {activeTab === 'sms' && (
start_sms = -1
for i, line in enumerate(lines):
    if "{activeTab === 'sms' && (" in line:
        start_sms = i
        break

if start_sms != -1:
    db_lines = lines[:start_sms]
    sms_lines = lines[start_sms:]
    
    # db_lines ends with `        )}` which was closing the database tab in the original file.
    # In DatabaseTab, the last line should be `</>` instead of `)}` or just `</>`.
    # Let's fix the end of db_lines:
    # Find the last `)}` in db_lines and remove it, as it was replaced by `</>` at the end of the file.
    # Wait, the end of the file had `</>`, but now it's at the end of `sms_lines`.
    # So `db_lines` needs `  </>\n);\n}\n` appended.
    # And we must remove the last `)}` from `db_lines` which used to close `{activeTab === 'database' && (`.
    for i in range(len(db_lines)-1, -1, -1):
        if ")}" in db_lines[i]:
            db_lines[i] = db_lines[i].replace(")}", "")
            break
            
    db_lines.append("  </>\n  );\n}\n")
    
    with open('src/components/tabs/DatabaseTab.tsx', 'w') as f:
        f.writelines(db_lines)

    # Now create SmsTab.tsx
    # But wait, we need the imports and state!
    # Let's just copy the header of DatabaseTab.tsx
    header = []
    for line in db_lines:
        header.append(line)
        if "return (" in line:
            break
    
    sms_comp_lines = []
    sms_comp_lines.extend(header)
    # replace "export default function DatabaseTab" with "export default function SmsTab"
    for i in range(len(sms_comp_lines)):
        if "DatabaseTab" in sms_comp_lines[i]:
            sms_comp_lines[i] = sms_comp_lines[i].replace("DatabaseTab", "SmsTab")
    
    sms_comp_lines.append("    <>\n")
    # strip `{activeTab === 'sms' && (` from the first sms line
    sms_lines[0] = sms_lines[0].replace("{activeTab === 'sms' && (", "")
    
    # sms_lines already ends with `</>\n  );\n}\n` from the original extraction!
    # Wait, the original extraction replaced the VERY last `)}` with `</>`.
    # So sms_lines has `</>` at the end!
    # So we just append them.
    sms_comp_lines.extend(sms_lines)
    
    with open('src/components/tabs/SmsTab.tsx', 'w') as f:
        f.writelines(sms_comp_lines)

print("Fixed DatabaseTab and created SmsTab")

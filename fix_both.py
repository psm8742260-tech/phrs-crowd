with open('src/components/tabs/SmsTab.tsx', 'r') as f:
    sms_lines = f.readlines()
# remove `        )}\n` from SmsTab
sms_lines = [l for l in sms_lines if l.strip() != ")}"]

with open('src/components/tabs/SmsTab.tsx', 'w') as f:
    f.writelines(sms_lines)

with open('src/components/tabs/DatabaseTab.tsx', 'r') as f:
    db_lines = f.readlines()

# wait, DatabaseTab error was `1328,11: ')' expected.`
# let's see the end of DatabaseTab.tsx
print("Last 20 lines of DatabaseTab.tsx:")
for i, line in enumerate(db_lines[-20:]):
    print(len(db_lines)-20+i, line.rstrip())


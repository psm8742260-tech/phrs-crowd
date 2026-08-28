with open('src/App.tsx', 'r') as f:
    text = f.read()

text = text.replace("import DatabaseTab from './components/tabs/DatabaseTab';", "import DatabaseTab from './components/tabs/DatabaseTab';\nimport SmsTab from './components/tabs/SmsTab';")

idx = text.find("<DatabaseTab state={globalState} />")
if idx != -1:
    # Insert SmsTab right after DatabaseTab
    # Find the closing `)}` of database tab
    closing_idx = text.find(")}", idx)
    insert_str = "\n        {activeTab === 'sms' && (\n          <SmsTab state={globalState} />\n        )}\n"
    text = text[:closing_idx+3] + insert_str + text[closing_idx+3:]

with open('src/App.tsx', 'w') as f:
    f.write(text)


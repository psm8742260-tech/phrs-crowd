with open('src/components/tabs/DatabaseTab.tsx', 'r') as f:
    text = f.read()

opens = text.count("&& (")
closes = text.count(")}")
print(f"DatabaseTab: {opens} opens, {closes} closes")

with open('src/components/tabs/SmsTab.tsx', 'r') as f:
    text2 = f.read()

opens2 = text2.count("&& (")
closes2 = text2.count(")}")
print(f"SmsTab: {opens2} opens, {closes2} closes")


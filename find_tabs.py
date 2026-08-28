with open('src/components/tabs/DatabaseTab.tsx', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'selectedSubMenu ===' in line or 'phrsDbSubTab ===' in line or 'activeTab ===' in line:
        print(f"Line {i+1}: {line.strip()}")

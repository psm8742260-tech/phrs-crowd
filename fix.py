with open('src/App.tsx', 'r') as f:
    lines = f.readlines()

new_end = [
    '              )}\n',
    '            </div>\n',
    '          </div>\n',
    '        )}\n',
    '      </main>\n',
    '    </div>\n',
    '  </div>\n',
    '</div>\n',
    ');\n',
    '}\n'
]

# We will replace everything from line 8642 to the end with new_end
with open('src/App.tsx', 'w') as f:
    f.writelines(lines[:8641])
    f.writelines(new_end)

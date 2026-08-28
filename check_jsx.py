import re

def check_html_balance(filename):
    with open(filename, 'r') as f:
        content = f.read()
    
    # We want to find all JSX tags like <div>, </div>, <Database>, <Database />, etc.
    # We can use a simple regex to find JSX tags.
    # Note that we should ignore comments, strings, etc. if possible, but let's do a simple count first.
    
    # Let's clean comments first
    content_no_comments = re.sub(r'{\/\*.*?\*\/}', '', content, flags=re.DOTALL)
    content_no_comments = re.sub(r'\/\/.*', '', content_no_comments)
    
    # Find all JSX tags
    tags = re.findall(r'<\/?([a-zA-Z0-9_]+)(?:\s+[^>]*?)?(\/?)>', content_no_comments)
    
    stack = []
    for tag, self_closing in tags:
        # Ignore common HTML self-closing or lowercase tags if we want, but let's check all
        # Wait, self_closing is '/' if it ends with '/>'
        if self_closing == '/':
            continue
        if tag in ['input', 'br', 'img', 'hr', 'textarea']: # commonly self-closing in HTML, but in JSX they must be self-closing (which would have self_closing == '/')
            # unless they are written without / which is invalid in JSX anyway
            pass
            
        if tag.startswith('/'):
            # Closing tag
            tag_name = tag[1:]
            if not stack:
                print(f"Error: Excess closing tag </{tag_name}>")
            else:
                top = stack.pop()
                if top != tag_name:
                    print(f"Mismatch: Opened <{top}>, but closed with </{tag_name}>")
        else:
            # Opening tag
            stack.append(tag)
            
    print("Remaining open tags in stack:", stack)

print("Checking DatabaseTab.tsx:")
check_html_balance('src/components/tabs/DatabaseTab.tsx')

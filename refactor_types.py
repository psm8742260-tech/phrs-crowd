import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add the import at the top
content = re.sub(
    r"import \{([^}]+)\} from 'lucide-react';", 
    r"import {\1} from 'lucide-react';\nimport { Project, Deployment, SystemMetric } from './types';", 
    content
)

# Remove the interfaces
content = re.sub(r'interface Project \{.*?\n\}\n', '', content, flags=re.DOTALL)
content = re.sub(r'interface Deployment \{.*?\n\}\n', '', content, flags=re.DOTALL)
content = re.sub(r'interface SystemMetric \{.*?\n\}\n', '', content, flags=re.DOTALL)
content = re.sub(r'// Types\n', '', content)

with open('src/App.tsx', 'w') as f:
    f.write(content)

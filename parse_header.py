import re

with open('src/App.tsx', 'r') as f:
    text = f.read()

start = text.find('<header')
end = text.find('</header>') + 9
header_code = text[start:end]

# Extract all word tokens that look like variables
words = re.findall(r'\b[a-zA-Z_][a-zA-Z0-9_]*\b', header_code)
# Filter out standard HTML/React stuff
ignore = set(['className', 'div', 'span', 'svg', 'path', 'button', 'header', 'input', 'img', 'a', 'p', 'h3', 'h4', 'ul', 'li', 'd', 'fill', 'stroke', 'strokeWidth', 'strokeLinecap', 'strokeLinejoin', 'viewBox', 'xmlns', 'type', 'id', 'x1', 'y1', 'x2', 'y2', 'offset', 'stopColor', 'fillRule', 'clipRule', 'placeholder', 'src', 'alt', 'href', 'target', 'rel', 'onClick', 'onChange', 'onKeyDown', 'value', 'checked', 'htmlFor', 'd', 'text', 'autoFocus', 'disabled', 'readOnly', 'size', 'color', 'style', 'width', 'height', 'top', 'left', 'right', 'bottom', 'position', 'absolute', 'relative', 'fixed', 'sticky', 'z', 'flex', 'grid', 'hidden', 'block', 'w', 'h', 'bg', 'text', 'border', 'rounded', 'shadow', 'p', 'm', 'px', 'py', 'mx', 'my', 'pt', 'pb', 'pl', 'pr', 'mt', 'mb', 'ml', 'mr', 'inset', 'gap', 'items', 'justify', 'center', 'start', 'end', 'between', 'around', 'evenly', 'row', 'col', 'wrap', 'nowrap', 'auto', 'min', 'max', 'full', 'screen', 'transparent', 'white', 'black', 'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'hover', 'focus', 'active', 'group', 'transition', 'duration', 'ease', 'delay', 'animate', 'transform', 'scale', 'rotate', 'translate', 'skew', 'origin', 'cursor', 'select', 'resize', 'pointer', 'events', 'none', 'auto', 'all', 'font', 'sans', 'serif', 'mono', 'bold', 'semibold', 'medium', 'normal', 'light', 'italic', 'uppercase', 'lowercase', 'capitalize', 'truncate', 'break', 'words', 'lines', 'leading', 'tracking', 'align', 'opacity', 'blur', 'drop', 'filter', 'backdrop', 'mix', 'blend', 'isolation', 'visible', 'invisible', 'collapse', 'outline', 'ring', 'offset', 'React', 'useState', 'useEffect', 'useRef', 'length', 'map', 'filter', 'find', 'includes', 'JSON', 'stringify', 'parse', 'localStorage', 'getItem', 'setItem', 'removeItem', 'console', 'log', 'warn', 'error', 'Math', 'round', 'floor', 'ceil', 'random', 'Date', 'now', 'toISOString', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'window', 'document', 'location', 'href', 'reload', 'open', 'close', 'focus', 'blur', 'alert', 'confirm', 'prompt', 'navigator', 'clipboard', 'writeText', 'e', 'target', 'value', 'key', 'preventDefault', 'stopPropagation', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'default', 'try', 'catch', 'finally', 'throw', 'new', 'typeof', 'instanceof', 'in', 'of', 'void', 'delete', 'async', 'await', 'function', 'class', 'extends', 'super', 'this', 'let', 'const', 'var', 'true', 'false', 'null', 'undefined', 'NaN', 'Infinity', 'is', 'as', 'any', 'boolean', 'number', 'string', 'symbol', 'object', 'Array', 'String', 'Number', 'Boolean', 'Object', 'Function', 'Symbol', 'Error', 'Promise', 'Map', 'Set', 'WeakMap', 'WeakSet', 'RegExp', 'linearGradient', 'defs', 'stop'])

# Add lucide icons used in header to ignore list
ignore.update(['ChevronDown', 'Search', 'Bell', 'Settings', 'User', 'LogOut', 'Menu', 'X'])

used_vars = set()
for word in words:
    if word not in ignore and not word.startswith('text-') and not word.startswith('bg-') and not word.startswith('border-') and not word.startswith('hover:') and not word.startswith('px-') and not word.startswith('py-') and not word.startswith('w-') and not word.startswith('h-') and not word.startswith('rounded-') and not word.startswith('shadow-') and not word.startswith('z-') and not word.startswith('min-') and not word.startswith('max-') and not word.startswith('stroke-'):
        used_vars.add(word)

print('Possible state/props:', list(used_vars))


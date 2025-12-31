import { Language } from '../types';

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    version: '18.15.0',
    monacoId: 'javascript',
    defaultCode: `console.log("Hello, DevStudio!");\n\nfunction sum(a, b) {\n  return a + b;\n}\n\nconsole.log("Sum:", sum(5, 7));`,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    version: '5.0.3',
    monacoId: 'typescript',
    defaultCode: `interface User {\n  name: string;\n  id: number;\n}\n\nconst user: User = {\n  name: "DevStudio",\n  id: 1,\n};\n\nconsole.log(\`Hello, \${user.name}!\`);`,
  },
  {
    id: 'python',
    name: 'Python',
    version: '3.10.0',
    monacoId: 'python',
    defaultCode: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("DevStudio"))\n\n# Calculate Fibonacci\na, b = 0, 1\nfor _ in range(10):\n    print(a, end=" ")\n    a, b = b, a + b`,
  },
  {
    id: 'java',
    name: 'Java',
    version: '15.0.2',
    monacoId: 'java',
    defaultCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, DevStudio!");\n    }\n}`,
  },
  {
    id: 'cpp',
    name: 'C++',
    version: '10.2.0',
    monacoId: 'cpp',
    defaultCode: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, DevStudio!" << std::endl;\n    return 0;\n}`,
  },
  {
    id: 'go',
    name: 'Go',
    version: '1.16.2',
    monacoId: 'go',
    defaultCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, DevStudio!")\n}`,
  },
  {
    id: 'rust',
    name: 'Rust',
    version: '1.68.2',
    monacoId: 'rust',
    defaultCode: `fn main() {\n    println!("Hello, DevStudio!");\n}`,
  },
];

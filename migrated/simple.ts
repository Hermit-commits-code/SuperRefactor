// [Migrated to TypeScript]
// A simple JS file for migration testing
function greet(name: string): string {
  return "Hello, " + name;
}

interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "Alice"
};

console.log(greet(user.name));

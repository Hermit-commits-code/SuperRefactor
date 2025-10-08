// [Migrated to TypeScript]
interface Book {
  title: string;
  author: string;
  year: number;
}

const books: Book[] = [
  { title: "1984", author: "George Orwell", year: 1949 },
  { title: "Brave New World", author: "Aldous Huxley", year: 1932 },
  { title: "Fahrenheit 451", author: "Ray Bradbury", year: 1953 },
];

function getTitles(arr: Book[]): string[] {
  return arr.map((b: Book) => b.title);
}

console.log(getTitles(books));

// Array of objects example
const books = [
  { title: "1984", author: "George Orwell", year: 1949 },
  { title: "Brave New World", author: "Aldous Huxley", year: 1932 },
  { title: "Fahrenheit 451", author: "Ray Bradbury", year: 1953 },
];

function getTitles(arr) {
  return arr.map((b) => b.title);
}

console.log(getTitles(books));

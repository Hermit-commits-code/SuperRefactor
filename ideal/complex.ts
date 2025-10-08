// [Migrated to TypeScript]
function sum(arr: number[]): number {
  return arr.reduce((a: number, b: number) => a + b, 0);
}

const data: number[] = [1, 2, 3, 4];

interface Profile {
  email: string;
  active: boolean;
}

interface User {
  id: number;
  name: string;
  tags: string[];
  profile: Profile;
}

const user: User = {
  id: 2,
  name: "Bob",
  tags: ["admin", "user"],
  profile: {
    email: "bob@example.com",
    active: true,
  },
};

class Account {
  owner: string;
  balance: number;
  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
  }
  deposit(amount: number): void {
    this.balance += amount;
  }
}

console.log(sum(data));
console.log(user.profile.email);

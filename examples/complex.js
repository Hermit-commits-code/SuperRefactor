// A more complex JS file for migration testing
function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

const data = [1, 2, 3, 4];

const user = {
  id: 2,
  name: "Bob",
  tags: ["admin", "user"],
  profile: {
    email: "bob@example.com",
    active: true,
  },
};

class Account {
  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
  }
  deposit(amount) {
    this.balance += amount;
  }
}

console.log(sum(data));
console.log(user.profile.email);

const rawUserData = `[
  {
    "id": 1,
    "name": " Chayan Soni ",
    "email": "chayan@gmail.com",
    "age": 19,
    "active": true
  },
  {
    "id": 2,
    "name": " Rahul Sharma ",
    "email": "rahul@gmail.com",
    "age": 17,
    "active": true
  },
  {
    "id": 3,
    "name": " Priya Singh ",
    "email": "priya@gmail.com",
    "age": 22,
    "active": false
  },
  {
    "id": 4,
    "name": " Aman Verma ",
    "email": "aman@gmail.com",
    "age": 21,
    "active": true
  }
]`;

const users = JSON.parse(rawUserData);

console.log("Original Data:");
console.log(users);

const validUsers = users.filter((user) => user.active && user.age >= 18);

const cleanedUsers = validUsers.map((user) => ({
  ...user,
  name: user.name.trim(),
}));

const finalUsers = cleanedUsers.map(({ id, name, email }) => ({
  id,
  name,
  email,
}));

const totalUsers = users.length;
const validUserCount = finalUsers.length;

console.log("\nSummary:");
console.log(`Total Users: ${totalUsers}`);
console.log(`Valid Users: ${validUserCount}`);

console.log("\nCleaned User Records:");
console.log(finalUsers);

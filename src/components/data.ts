export const books = [
  {
    title: "How to start using banko for your startup",
    image: "/blog/blog1.png",
    overview:
      "Exercitation do velit consectetur excepteur laborum sit magna deserunt cillum irure dolor excepteur ad.",
    tags: ["App", "Technology"],
  },
  {
    title: "10 things nobody told you about banko",
    image: "/blog/blog2.png",
    overview:
      "Exercitation do velit consectetur excepteur laborum sit magna deserunt cillum irure dolor excepteur ad.",
    tags: ["App", "Technology"],
  },
  {
    title: "How to start using banko for your startup",
    image: "/blog/blog3.png",
    overview:
      "Exercitation do velit consectetur excepteur laborum sit magna deserunt cillum irure dolor excepteur ad.",
    tags: ["App", "Technology"],
  },
  {
    title: "Why we love banko (and you should, too!)",
    image: "/blog/blog4.png",
    overview:
      "Exercitation do velit consectetur excepteur laborum sit magna deserunt cillum irure dolor excepteur ad.",
    tags: ["App", "Technology"],
  },
  {
    title: "5 principles of crypto investing you should always adhere to!",
    image: "/blog/blog5.png",
    overview:
      "Exercitation do velit consectetur excepteur laborum sit magna deserunt cillum irure dolor excepteur ad.",
    tags: ["App", "Technology"],
  },
  {
    title: "7 things about banko you should tell your friends",
    image: "/blog/blog6.png",
    overview:
      "Exercitation do velit consectetur excepteur laborum sit magna deserunt cillum irure dolor excepteur ad.",
    tags: ["App", "Technology"],
  },
];

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  accountNumber: string;
  balance: number;
  phone: string;
  pin:number;
  firstTimeUser: boolean
}

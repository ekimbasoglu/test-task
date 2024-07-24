import { User } from "../models/userModel";

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
];

export const getUsers = (): User[] => {
  return users;
};

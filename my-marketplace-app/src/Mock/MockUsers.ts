export interface MockUser {
  username: string;
  password: string;
  isAdmin?: boolean;
}

export const mockUsers: MockUser[] = [
  {
    username: "admin",
    password: "1234",
    isAdmin: true,
  },
  {
    username: "sheetal",
    password: "1234",
    isAdmin: false,
  },
];

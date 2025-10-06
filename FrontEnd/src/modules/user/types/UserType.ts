export type UserType = {
  id: string;
  username: string;
  full_name: string;
  role: "admin" | "user";
  email: string;
  profile_picture?: string;
};

export type UsersWithPagination = {
  count: number;
  next?: string;
  previous?: string;
  results: UserType[];
};

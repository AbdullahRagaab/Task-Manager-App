export type LoginCredentials = {
  username: string;
  password: string;
};

export type TokenRefreshType = {
  access: string;
  refresh: string;
};


export type SignupData = {
  name: string;
  username: string;
  email: string;
  password: string;
};

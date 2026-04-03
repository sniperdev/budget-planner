export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthServiceResult = AuthTokens & {
  user: AuthUser;
};


import { JwtSignOptions } from "@nestjs/jwt";

type ExpiresIn = NonNullable<JwtSignOptions['expiresIn']>;

export const jwtConstants = {
  accessSecret: process.env.JWT_ACCESS_SECRET ?? 'access_secret_dev',
  refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'refresh_secret_dev',
  accessExpiresIn: (process.env.JWT_ACCESS_EXPIRES_IN ?? 900) as ExpiresIn /* 15 minutes */,
  refreshExpiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ?? 604800) as ExpiresIn /* 7 days */,
  refreshCookieName: 'refresh_token',
};
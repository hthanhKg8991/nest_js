import { getMongoUri } from "@utils/helper";

export type AppConfig = {
  APP_PORT: number;
  MONGODB_URI: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  refreshIwtExpiresIn: string;
  googleClientId: string;
  googleClientSecret: string;
  botToken: string;
  smtpHost: string;
  smtpSecure: boolean;
  smtpPort: number;
  mailUser: string;
  mailPassword: string;
  cancelOrderLink: string;
  cancelOrderRedirect: string;
  frontendUrl: string;
  PRODUCT_SERVICE_HOT: string;
  PRODUCT_SERVICE_PORT: string;
  SECRET_CHECKSUM_KEY: string;
};

const AppConfigLoader = (): AppConfig => ({
  APP_PORT: +(process.env.APP_PORT || 3000),
  MONGODB_URI: getMongoUri(),
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES || '3m',
  refreshIwtExpiresIn: process.env.REFRESH_JWT_EXPIRES || '30m',
  googleClientId: process.env.GOOGLE_CLIENT_ID!,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  botToken: process.env.BOT_API_TOKEN!,
  smtpHost: process.env.SMTP_HOST!,
  smtpSecure: process.env.SECURE === 'false',
  smtpPort: +process.env.SMTP_PORT!,
  mailUser: process.env.MAIL_USER!,
  mailPassword: process.env.MAIL_PASS!,
  cancelOrderLink: process.env.CANCEL_ORDER_LINK!,
  cancelOrderRedirect: process.env.CANCEL_ORDER_REDIRECT!,
  frontendUrl: process.env.FRONTEND_URL!,
  PRODUCT_SERVICE_HOT: process.env.PRODUCT_SERVICE_HOT!,
  PRODUCT_SERVICE_PORT: process.env.PRODUCT_SERVICE_PORT!,
  SECRET_CHECKSUM_KEY: process.env.SECRET_CHECKSUM_KEY!,
});

export default AppConfigLoader;
import dotenv from "dotenv";
dotenv.config();

export default {
  db: process.env.DB_URL,
  port: process.env.PORT,
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
  defaultPassword: process.env.DEFAULT_PASS,
};

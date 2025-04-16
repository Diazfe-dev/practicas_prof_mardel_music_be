import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || "jwt_secret_key",
    MYSQL_HOST: process.env.MYSQL_HOST || "localhost",
    MYSQL_USER: process.env.MYSQL_USER || "user",
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "password",
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || "database",
};
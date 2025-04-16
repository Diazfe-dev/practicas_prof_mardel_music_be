import mysql from "mysql2/promise";
import envVars from "../config/env-vars.js";

const { MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER, MYSQL_DATABASE } = envVars;

const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
});

export default connection;
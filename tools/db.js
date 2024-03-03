import mysql from "mysql";
import config from "../config.js";

const db = mysql.createConnection(config.database);

export default db;
import mysql from "mysql";
import config from "../config.js";

export const db = mysql.createConnection(config.database)
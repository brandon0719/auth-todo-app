const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
    user: "postgres",
    password: process.env.DATABASE_PW,
    host: "localhost",
    port: 5432,
    database: "authtodolist",
});

module.exports = pool;
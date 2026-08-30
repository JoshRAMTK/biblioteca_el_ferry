import mysql2 from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config();
const pool = mysql2.createPool({

    host : process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

}); 

pool.getConnection();

async function connection_test(){
    try {
        const connection = await pool.getConnection();
        console.log("MySQL connection enable")
    } catch (error) {
        console.log("MySQL connection Error: ", error)
    }
}

export default pool


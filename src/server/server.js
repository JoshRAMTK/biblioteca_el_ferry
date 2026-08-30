import express from "express"
import dotenv from "dotenv"
import pool from "./data_base.js"

dotenv.config({ path: "./jwt.env" })

dotenv.config()

import usuarioRouter from "../routes/usuario.js"
import librosRouter from "../routes/libros.js"
import prestamosRouter from "../routes/prestamos.js"
import detallesRouter from "../routes/detalles_prestamo.js"
import errorHandler from "../middleware/error_handler.js"

const app = express()

app.use(express.json())

app.use("/api/usuarios", usuarioRouter)
app.use("/api/libros", librosRouter)
app.use("/api/prestamos", prestamosRouter)
app.use("/api/detalles", detallesRouter)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server en http://localhost:${PORT}`)
})

export default app
import express from "express";
import dotenv from "dotenv";

import usuarioRouter from "../routes/usuario.js";
import librosRouter from "../routes/libros.js";
import prestamosRouter from "../routes/prestamos.js";
import detallesRouter from "../routes/detalles_prestamo.js";
import authRouter from "../routes/auth.js"; // <-- Agregado

const app = express();
dotenv.config();
app.use(express.json());

app.use("/api/auth", authRouter); // <-- Agregado
app.use("/api/usuarios", usuarioRouter);
app.use("/api/libros", librosRouter);
app.use("/api/prestamos", prestamosRouter);
app.use("/api/detalles", detallesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server en http://localhost:${PORT}`);
});

export default app;
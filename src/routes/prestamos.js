import express from "express"
import * as prestamos_controller from "../controllers/prestamos_controller.js" 
import validateBody from "../middleware/validate_body.js"
import validateId from "../middleware/validate_id.js"
import { verificarToken } from "../middleware/auth.js"

const prestamosRouter = express.Router();
//GET 
prestamosRouter.get("/", verificarToken, prestamos_controller.getPrestamos)

//CREAR
prestamosRouter.post("/", verificarToken, validateBody(["fecha_prestamo", "fecha_devolucion", "id_usuario"]), prestamos_controller.postPrestamos)

//ACTUALIZAR
prestamosRouter.put("/:id", verificarToken, validateId, validateBody(["fecha_prestamo", "fecha_devolucion", "id_usuario"]), prestamos_controller.putPrestamos)
 
//ELIMINAR 

prestamosRouter.delete("/:id", verificarToken, validateId, prestamos_controller.deletePrestamos)

export default prestamosRouter
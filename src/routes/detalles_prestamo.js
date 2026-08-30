import express from "express"
import * as detalles_controller from "../controllers/detalles_controller.js"
import validateBody from "../middleware/validate_body.js"
import validateId from "../middleware/validate_id.js"
import { verificarToken } from "../middleware/auth.js"

const detallesRouter = express.Router();
//GET sin ID 
detallesRouter.get("/", verificarToken, detalles_controller.getDetalles)


//CREAR
detallesRouter.post("/", verificarToken, validateBody(["id_usuario", "id_libro", "descripcion"]), detalles_controller.postDetalles)


//ACTUALIZAR
detallesRouter.put("/:id", verificarToken, validateId, validateBody(["id_usuario", "id_libro", "descripcion"]), detalles_controller.putDetalles)


//ELIMINAR 
detallesRouter.delete("/:id", verificarToken, validateId, detalles_controller.deleteDetalles)

export default detallesRouter
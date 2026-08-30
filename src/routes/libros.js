import express from "express"
import * as libros_controller from "../controllers/libros_controller.js"
import validateBody from "../middleware/validate_body.js"
import validateId from "../middleware/validate_id.js"
import { verificarToken } from "../middleware/auth.js"

const librosRouter = express.Router();
//GET sin ID 
librosRouter.get("/", verificarToken, libros_controller.getLibros )


//CREAR
librosRouter.post("/", verificarToken, validateBody(["titulo", "autor", "año", "estado"]), libros_controller.postLibros)


//ACTUALIZAR
librosRouter.put("/:id", verificarToken, validateId, validateBody(["titulo", "autor", "año", "estado"]), libros_controller.putLibros)


//ELIMINAR 

librosRouter.delete("/:id", verificarToken, validateId, libros_controller.deleteLibros)


export default librosRouter
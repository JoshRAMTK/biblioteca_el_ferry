import express from "express"
import * as usuario_controller from "../controllers/usuarios_controller.js" 
import validateBody from "../middleware/validate_body.js"
import validateId from "../middleware/validate_id.js"
import { verificarToken } from "../middleware/auth.js"

const usuarioRouter = express.Router();

usuarioRouter.post("/login", validateBody(["correo", "password"]), usuario_controller.loginUsuario)
usuarioRouter.post("/", validateBody(["nombre", "correo", "telefono", "password"]), usuario_controller.postUsuarios)
usuarioRouter.get("/", verificarToken, usuario_controller.getUsuarios)
usuarioRouter.put("/:id", verificarToken, validateId, validateBody(["nombre", "correo", "telefono"]), usuario_controller.putUsuario)
usuarioRouter.delete("/:id", verificarToken, validateId, usuario_controller.deleteUsuario)


export default usuarioRouter
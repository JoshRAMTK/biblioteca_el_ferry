import express from "express"
import * as usuario_controller from "../controllers/usuarios_controller.js" 


const usuarioRouter = express.Router();

usuarioRouter.post("/", usuario_controller.postUsuarios)
usuarioRouter.get("/", usuario_controller.getUsuarios)
usuarioRouter.put("/:id", usuario_controller.putUsuario)
usuarioRouter.delete("/:id",  usuario_controller.deleteUsuario)


export default usuarioRouter
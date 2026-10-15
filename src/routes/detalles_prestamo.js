import express from "express"
import * as detalles_controller from "../controllers/detalles_controller.js"


const detallesRouter = express.Router();
//GET sin ID 
detallesRouter.get("/",  detalles_controller.getDetalles)


//CREAR
detallesRouter.post("/", detalles_controller.postDetalles)


//ACTUALIZAR
detallesRouter.put("/:id",  detalles_controller.putDetalles)


//ELIMINAR 
detallesRouter.delete("/:id", detalles_controller.deleteDetalles)

export default detallesRouter
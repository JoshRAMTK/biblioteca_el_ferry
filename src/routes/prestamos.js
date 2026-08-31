import express from "express"
import * as prestamos_controller from "../controllers/prestamos_controller.js" 


const prestamosRouter = express.Router();
//GET 
prestamosRouter.get("/",  prestamos_controller.getPrestamos)

//CREAR
prestamosRouter.post("/", prestamos_controller.postPrestamos)

//ACTUALIZAR
prestamosRouter.put("/:id", prestamos_controller.putPrestamos)
 
//ELIMINAR 
prestamosRouter.delete("/:id", prestamos_controller.deletePrestamos)

export default prestamosRouter
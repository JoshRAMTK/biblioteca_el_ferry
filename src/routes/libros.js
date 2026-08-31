import express from "express"
import * as libros_controller from "../controllers/libros_controller.js"


const librosRouter = express.Router();
//GET sin ID 
librosRouter.get("/",  libros_controller.getLibros )


//CREAR
librosRouter.post("/", libros_controller.postLibros)


//ACTUALIZAR
librosRouter.put("/:id", libros_controller.putLibros)


//ELIMINAR 

librosRouter.delete("/:id",libros_controller.deleteLibros)


export default librosRouter
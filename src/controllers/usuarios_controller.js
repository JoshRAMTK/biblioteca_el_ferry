
import pool from "../server/data_base.js"
import {generarToken} from "../middleware/token.js"


//OBTENER  USUARIOS 
export const getUsuarios = async (req,res) =>{
    try {

        const [rows] = await pool.query('SELECT * FROM usuarios')
        console.log("Users founded successfully: ", rows)
        res.status(200).json({message: "Success", users: rows})
        
    } catch (error) {

        console.log("Users NOT founded: ", error)
        res.status(500).json({message: "Internal Server Error"})
    }
    

    };


//CREAR USUARIOS
export const postUsuarios = async (req,res) =>{
    try {

        const {nombre, correo, telefono, password} = req.body
        const [result] = await pool.query('INSERT INTO usuarios (nombre, correo, telefono, password) VALUES (?, ?, ?, ?)', [nombre, correo, telefono, password])

        const nuevoUsuario = {
        id_usuario: result.insertId,
        nombre,
        correo,
        telefono,
        password
    }

    const token = generarToken(nuevoUsuario)
    console.log("User created successfuly", result)
        res.status(201).json({message: "User created ", token, user: nuevoUsuario})
        
    } catch (error) {

        console.log("User NOT created: ", error)
        res.status(500).json({Message: "Internal Server Error"})
    } 
}


//ACTUALIZAR USUARIOS
export const putUsuario = async (req , res) => {
    try {
        const {id} = req.params
        const {nombre, correo, telefono} = req.body
        const [result] = await pool.query('UPDATE usuarios SET nombre=?, correo=?, telefono=? WHERE id_usuario=?', [nombre, correo, telefono, id])

        if(result.affectedRows === 0){

            return res.status(404).json({message: "User NOT founded with this ID"})

        }

        console.log("User UPDATED succesfuly")
        res.status(200).json({message: "User UPDATED correctly"})


    } catch (error) {

        console.log("User NOT UPDATED error: ", error)
        res.status(500).json({message: "Internal Server Error", error})

    }
}


//ELIMINAR USUARIOS
export const deleteUsuario = async (req, res) => 
{
    try {
        const ID = req.params.id

        const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario=?', [ID])

        console.log("User DELETED successfully: ", result)
        res.status(200).json({message: "DELETED correctly"})
        
    } catch (error) {

        console.log("User NOT DELETED error: ", error)
        res.status(500).json({message: "Internal Server Error"})

    }

}
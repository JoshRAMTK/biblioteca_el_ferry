import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import pool from "../server/data_base.js"

const getPasswordField = async () => {
    const [columns] = await pool.query('SHOW COLUMNS FROM usuarios')
    const fieldNames = columns.map((column) => column.Field)

    if (fieldNames.includes("password_hash")) return "password_hash"
    if (fieldNames.includes("password")) return "password"

    return null
}

export const loginUsuario = async (req, res) => {
    try {
        const { correo, password } = req.body

        const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo])
        const usuario = rows[0]

        if (!usuario) {
            return res.status(401).json({ message: "Credenciales inválidas" })
        }

        const passwordField = await getPasswordField()
        const storedPassword = passwordField ? usuario[passwordField] : null

        if (!storedPassword) {
            return res.status(500).json({ message: "No existe campo de contraseña en la base de datos" })
        }

        const passwordValida = await bcrypt.compare(password, storedPassword)

        if (!passwordValida) {
            return res.status(401).json({ message: "Credenciales inválidas" })
        }

        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                correo: usuario.correo,
                nombre: usuario.nombre,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        )

        return res.status(200).json({
            message: "Login exitoso",
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                correo: usuario.correo,
            }
        })
    } catch (error) {
        console.log("Login error: ", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

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
}


//CREAR USUARIOS
export const postUsuarios = async (req,res) =>{
    try {

        const {nombre, correo, telefono, password} = req.body

        if (!password) {
            return res.status(400).json({ message: "La contraseña es obligatoria" })
        }

        const passwordField = await getPasswordField()

        if (!passwordField) {
            return res.status(500).json({ message: "La tabla usuarios no tiene campo de contraseña" })
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const [result] = await pool.query(
            `INSERT INTO usuarios (nombre, correo, telefono, ${passwordField}) VALUES (?,?,?,?)`,
            [nombre, correo, telefono, passwordHash]
        )

        console.log("User created successfuly", result)
        res.status(201).json({message: "User created "})
        
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
import pool from "../server/data_base.js"

//OBTENER LIBROS
export const getLibros = async (req,res) =>{
    try {

        const [rows] = await pool.query('SELECT * FROM libros')
        console.log("Books founded successfully: ", rows)
        res.status(200).json({message: "Success"})
        
    } catch (error) {

        console.log("Books NOT founded: ", error)
        res.status(200).json({message: "Internal Server Error"})
    }
}


//CREAR USUARIOS
export const postLibros = async (req,res) =>{
    try {

        const {titulo, autor, año, estado} = req.body
        const [result] = await pool.query('INSERT INTO libros (titulo, autor, año, estado) VALUES (?,?,?,?)', [titulo, autor, año, estado]) 
        console.log("Book created successfully", result)
        res.status(201).json({message: "Book created successfully", id: result.insertId})
        
    } catch (error) {

        console.log("Book NOT created: ", error)
        res.status(500).json({Message: "Internal Server Error"})
    } 
}


//ACTUALIZAR LIBROS
export const putLibros = async (req , res) => {
    try {

        const {id} = req.params
        const {titulo, autor, año, estado} = req.body
        const [result] = await pool.query('UPDATE libros SET titulo=?, autor=?, año=?, estado=? WHERE id_libro=?', [titulo, autor, año, estado, id])

        if(result.affectedRows === 0){

            return res.status(404).json({message: "Book NOT founded with this ID"})

        }

        console.log("Book UPDATED succesfuly")
        res.status(200).json({message: "Book UPDATED correctly"})


    } catch (error) {

        console.log("Book NOT UPDATED error: ", error)
        res.status(500).json({message: "Internal Server Error", error})

    }
}


//ELIMINAR LIBROS
export const deleteLibros = async (req, res) => 
{
    try {
        const {id} = req.params

        const [result] = await pool.query('DELETE FROM libros WHERE id_libro=?', [id])

        console.log("Book DELETED successfully: ", result)
        res.status(200).json({message: "Book DELETED correctly"})
        
    } catch (error) {

        console.log("Book NOT DELETED error: ", error)
        res.status(500).json({message: "Internal Server Error"})

    }

}
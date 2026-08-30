import pool from "../server/data_base.js"


//OBTENER prestamos
export const getPrestamos = async (req,res) =>{
    try {

        const [rows] = await pool.query('SELECT * FROM prestamos ')
        console.log("Loans founded successfully: ", rows)
        res.status(200).json({message: "Success"})
        
    } catch (error) {

        console.log("Loans NOT founded: ", error)
        res.status(200).json({message: "Internal Server Error"})
    }
}


//CREAR USUARIOS
export const postPrestamos = async (req,res) =>{
    try {

        const {fecha_prestamo, fecha_devolucion, id_usuario} = req.body
        const [result] = await pool.query('INSERT INTO prestamos (fecha_prestamo, fecha_devolucion, id_usuario) VALUES (?,?,?)', [fecha_prestamo, fecha_devolucion, id_usuario]) 
        console.log("Loan created successfuly", result)
        res.status(201).json({message: "User created "})
        
    } catch (error) {

        console.log("User NOT created: ", error)
        res.status(500).json({Message: "Internal Server Error"})
    } 
}


//ACTUALIZAR USUARIOS
export const putPrestamos = async (req , res) => {
    try {
        const {id} = req.params
        const {fecha_prestamo, fecha_devolucion, id_usuario} = req.body
        const [result] = await pool.query('UPDATE prestamos SET fecha_prestamo=?, fecha_devolucion=?, id_usuario=? WHERE id_prestamos=? ' , [fecha_prestamo, fecha_devolucion, id_usuario, id])

        if(result.affectedRows === 0){

            return res.status(404).json({message: "Loan NOT founded with this ID"})

        }

        console.log("Loan UPDATED succesfuly")
        res.status(200).json({message: "Loan UPDATED correctly"})


    } catch (error) {

        console.log("Loan NOT UPDATED error: ", error)
        res.status(500).json({message: "Internal Server Error", error})

    }
}


//ELIMINAR USUARIOS
export const deletePrestamos = async (req, res) => 
{
    try {
        const id = req.params.id

        const [result] = await pool.query('DELETE FROM prestamos WHERE id_prestamos=?', [id])

        console.log("Loan DELETED successfully: ", result)
        res.status(200).json({message: "Loan DELETED correctly"})
        
    } catch (error) {

        console.log("Loan NOT DELETED error: ", error)
        res.status(500).json({message: "Internal Server Error"})

    }

}
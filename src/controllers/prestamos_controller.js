import pool from "../server/data_base.js";

// OBTENER PRESTAMOS
export const getPrestamos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM prestamos');
        res.status(200).json(rows);
    } catch (error) {
        console.log("Loans NOT found: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// CREAR PRESTAMO
export const postPrestamos = async (req, res) => {
    try {
        // Incluimos id_libro que está en tu tabla como NOT NULL
        const { id_usuario, id_libro, fecha_prestamo, fecha_devolucion } = req.body;
        const [result] = await pool.query(
            'INSERT INTO prestamos (id_usuario, id_libro, fecha_prestamo, fecha_devolucion) VALUES (?,?,?,?)', 
            [id_usuario, id_libro, fecha_prestamo, fecha_devolucion]
        ); 
        res.status(201).json({ message: "Loan created successfully", id: result.insertId });
    } catch (error) {
        console.log("Loan NOT created: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    } 
};

// ACTUALIZAR PRESTAMO
export const putPrestamos = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usuario, id_libro, fecha_prestamo, fecha_devolucion } = req.body;
        
        // Cambiado id_prestamos a id_prestamo (singular)
        const [result] = await pool.query(
            'UPDATE prestamos SET id_usuario=?, id_libro=?, fecha_prestamo=?, fecha_devolucion=? WHERE id_prestamo=?', 
            [id_usuario, id_libro, fecha_prestamo, fecha_devolucion, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Loan NOT found with this ID" });
        }

        res.status(200).json({ message: "Loan UPDATED correctly" });
    } catch (error) {
        console.log("Loan NOT UPDATED error: ", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// ELIMINAR PRESTAMO
export const deletePrestamos = async (req, res) => {
    try {
        const { id } = req.params;
        // Cambiado id_prestamos a id_prestamo (singular)
        const [result] = await pool.query('DELETE FROM prestamos WHERE id_prestamo=?', [id]);

        res.status(200).json({ message: "Loan DELETED correctly" });
    } catch (error) {
        console.log("Loan NOT DELETED error: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
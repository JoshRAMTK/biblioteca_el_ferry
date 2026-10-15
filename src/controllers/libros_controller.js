import pool from "../server/data_base.js";

// OBTENER LIBROS
export const getLibros = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM libros');
        console.log("Books found successfully: ", rows);
        res.status(200).json(rows);
    } catch (error) {
        console.log("Books NOT found: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// CREAR LIBROS
export const postLibros = async (req, res) => {
    try {
        const { titulo, autor, año, estado } = req.body;
        const [result] = await pool.query(
            'INSERT INTO libros (titulo, autor, año, estado) VALUES (?,?,?,?)', 
            [titulo, autor, año, estado]
        ); 
        console.log("Book created successfully", result);
        res.status(201).json({ message: "Book created successfully", id: result.insertId });
    } catch (error) {
        console.log("Book NOT created: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    } 
};

// ACTUALIZAR LIBROS
export const putLibros = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, año, estado } = req.body;
        const [result] = await pool.query(
            'UPDATE libros SET titulo=?, autor=?, año=?, estado=? WHERE id_libro=?', 
            [titulo, autor, año, estado, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Book NOT found with this ID" });
        }

        console.log("Book UPDATED successfully");
        res.status(200).json({ message: "Book UPDATED correctly" });
    } catch (error) {
        console.log("Book NOT UPDATED error: ", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// ELIMINAR LIBROS
export const deleteLibros = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM libros WHERE id_libro=?', [id]);

        console.log("Book DELETED successfully: ", result);
        res.status(200).json({ message: "Book DELETED correctly" });
    } catch (error) {
        console.log("Book NOT DELETED error: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
import pool from "../server/data_base.js";

// OBTENER DETALLES
export const getDetalles = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM detalles');
        console.log("Details found successfully: ", rows);
        res.status(200).json(rows);
    } catch (error) {
        console.log("Details NOT found: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// CREAR DETALLES
export const postDetalles = async (req, res) => {
    try {
        const { id_usuario, id_libro, descripcion } = req.body;
        const [result] = await pool.query(
            'INSERT INTO detalles (id_usuario, id_libro, descripcion) VALUES (?,?,?)', 
            [id_usuario, id_libro, descripcion]
        );
        console.log("Details created successfully", result);
        res.status(201).json({ message: "Details created successfully", id: result.insertId });
    } catch (error) {
        console.log("Details NOT created: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    } 
};

// ACTUALIZAR DETALLES
export const putDetalles = async (req, res) => {
    try {
        const { id } = req.params; // <-- Se corrió el error req.params.id
        const { id_usuario, id_libro, descripcion } = req.body;
        const [result] = await pool.query(
            'UPDATE detalles SET id_usuario=?, id_libro=?, descripcion=? WHERE id_detalle=?', 
            [id_usuario, id_libro, descripcion, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Detail NOT found with this ID" });
        }

        console.log("Details UPDATED successfully");
        res.status(200).json({ message: "Details UPDATED correctly" });
    } catch (error) {
        console.log("Details NOT UPDATED error: ", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// ELIMINAR DETALLES
export const deleteDetalles = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM detalles WHERE id_detalle=?', [id]);

        console.log("Details DELETED successfully: ", result);
        res.status(200).json({ message: "Details DELETED correctly" });
    } catch (error) {
        console.log("Details NOT DELETED error: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
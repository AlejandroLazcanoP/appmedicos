// publicidadController.js

const connection = require("express-myconnection");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error("Error de conexión a la base de datos:", err);
            return res.status(500).json({ error: "Error de conexión a la base de datos" });
        }

        const query = `
            SELECT CONCAT(medico.nombre, ' - ', especialidad.nombre) AS nombre_completo, medico.correo
            FROM medico
            JOIN especialidad ON medico.id_especialidad = especialidad.id
        `;

        conn.query(query, (err, publicidad) => {
            if (err) {
                console.error("Error al ejecutar la consulta:", err);
                return res.status(500).json({ error: "Error al ejecutar la consulta" });
            }

            res.render('publicidad', {
                publicidad: publicidad
            });
        });
    });
};

module.exports = controller;



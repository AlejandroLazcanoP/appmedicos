// src/controllers/medicosController.js

const connection = require("express-myconnection");

const controller = {}

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT medico.*, especialidad.nombre AS nombre_especialidad FROM medico JOIN especialidad ON medico.id_especialidad = especialidad.id', (err, medicos) => {
            if (err) {
                res.json(err);
            }
            conn.query('SELECT * FROM especialidad', (err, especialidades) => {
                if (err) {
                    res.json(err);
                }
                res.render('medicos', {
                    data: medicos,
                    especialidades: especialidades
                });
            });
        });
    });
}


controller.save = (req,res)=>{
    const data = req.body;
    req.getConnection((err,conn) => {
        conn.query('INSERT INTO medico set ?',[data],(err, medico) => {
            //console.log(medicos);
            res.redirect('/medicos');
        });
    })
 
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM medico WHERE id = ?', [id], (err, medico) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                conn.query('SELECT * FROM especialidad', (err, especialidades) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/');
                    } else {
                        res.render('medico_edit', {
                            data: medico[0],
                            especialidades: especialidades
                        });
                    }
                });
            }
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newMedico = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE medico SET ? WHERE id = ?', [newMedico, id], (err, rows) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/medicos'); 
        });
    });
};

controller.delete = (req,res) =>{
    const {id}= req.params;
    req.getConnection((err,conn) =>{
        conn.query('DELETE FROM medico WHERE id = ?',[id],(err,rows)=>{
            res.redirect('/medicos');
        });  
    });
};

module.exports = controller;
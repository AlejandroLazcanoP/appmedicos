// src/controllers/especialidadController.js

const connection = require("express-myconnection");

const controller = {}

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM especialidad', (err, especialidad) => {
            if (err) {
                res.json(err);
            }
            // console.log(especialidad)
            res.render('especialidad', {
                data: especialidad
            });
        });
    });
}

controller.save = (req,res)=>{
    const data = req.body;
    req.getConnection((err,conn) => {
        conn.query('INSERT INTO especialidad set ?',[data],(err, especialidad) => {
            console.log(especialidad);
            res.redirect('/especialidad');
        });
    })
 
};

controller.edit = (req,res) =>{
    const {id}= req.params;
    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM especialidad WHERE id = ?',[id],(err,especialidad)=>{
            res.render('especialidad_edit',{
                data: especialidad[0]
            })
        });
    });
};
controller.update = (req,res) =>{
    const {id}= req.params;
    const newespecialidad = req.body;
    req.getConnection((err,conn) => {
        conn.query('UPDATE especialidad set ? WHERE id = ?',[newespecialidad, id],(err,rows)=>{
            res.redirect('/especialidad');
        })
    })
};


controller.delete = (req,res) =>{
    const {id}= req.params;
    req.getConnection((err,conn) =>{
        conn.query('DELETE FROM especialidad WHERE id = ?',[id],(err,rows)=>{
            res.redirect('/especialidad');
        });  
    });
};

module.exports = controller;

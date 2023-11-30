// src/app.js
const express = require ('express')
const path =require('path')
const morgan= require('morgan');
const mysql = require('mysql')
const myConnection = require('express-myconnection');


const app = express()

// importing routes
const especialidadRoutes= require('./routes/especialidad');
const medicosRoutes = require('./routes/medicos')
const publicidadRoutes = require('./routes/publicidad');
const principalRoutes = require('./routes/principal')
// setings 
app.set('port',process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set ('views',path.join(__dirname,'views'));


//midelwares
app.use(morgan('dev'))
app.use(myConnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3307,
    database: 'medicos'
},'single'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/especialidad', especialidadRoutes);
app.use('/medicos', medicosRoutes);
app.use('/publicidad', publicidadRoutes);
app.use('/',principalRoutes);

// statics files
app.use(express.static(path.join(__dirname,'public')))


//staring the server
app.listen(app.get('port'), ()=>{
    console.log('Server on port 3000');
});
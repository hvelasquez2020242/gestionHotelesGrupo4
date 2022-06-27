const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;


const HotelesSchema = Schema({

        nombre: String, 
        direccion: String, 
        descripcion: String, 
        administrador: String,
        password: String,
        rol: String,
        idioma: String, 
        telefono: Number,
        puesto: String,

    })

    module.exports = mongoose.model('Hoteles', HotelesSchema)
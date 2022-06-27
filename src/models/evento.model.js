const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const Evento = Schema({
    nombre: String, 
    descripcion: String, 
    tipoDeEvento: String, 
    idHotel: {type: Schema.Types.ObjectId, ref: 'Hoteles'}
})
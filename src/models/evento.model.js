const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const EventoSchema = Schema({
    nombre: String, 
    descripcion: String, 
    tipoDeEvento: String, 
    fecha: String, 
    lugar: String,
    idHotel: {type: Schema.Types.ObjectId, ref: 'Hoteles'}
})   
module.exports = mongoose.model('Eventos', EventoSchema)
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const Factura = Schema({
    nombre: String, 
    idUser: String, 
    tipoDeHabitacio: String,
    total: Number,
    idHotel: {type: Schema.Types.ObjectId, ref: 'Hoteles'}
})   
module.exports = mongoose.model('Factura', Factura)
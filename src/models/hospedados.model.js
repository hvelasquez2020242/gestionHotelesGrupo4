const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;


const HospedadosSchema = Schema({

        idUsuario:  {type : Schema.Types.ObjectId, ref: 'Usuarios'}, 
        tipoDeHabitacion: String,
        cantidadDias: Number, 
        servicios: [{
            nombre: String,
            precio: Number 
        }],
        total: String,
        idHotel: {type : Schema.Types.ObjectId, ref: 'Hoteles'}
    })

    module.exports = mongoose.model('Hospedados', HospedadosSchema)
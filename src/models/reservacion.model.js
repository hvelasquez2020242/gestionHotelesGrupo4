const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;


const ReservacionSchema = Schema({

        idUsuario:  {type : Schema.Types.ObjectId, ref: 'Usuarios'}, 
        tipoDeHabitacion: String,
        cantidadDias: Number, 
        total: String,
        idHabitacion: {type: Schema.Types.ObjectId, ref: 'Habitaciones'},
        idHotel: {type : Schema.Types.ObjectId, ref: 'Hoteles'}
    })

    module.exports = mongoose.model('Reservacion', ReservacionSchema)
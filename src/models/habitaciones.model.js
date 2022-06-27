const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;


const HabitacionSchema = Schema({

        horario: String, 
        precio: Number, 
        caracteristicas: String,
        disponibles: Number, 
        tipo: String, 
        idHotel: {type : Schema.Types.ObjectId, ref: 'Hoteles'}
    })

    module.exports = mongoose.model('Habitaciones', HabitacionSchema)
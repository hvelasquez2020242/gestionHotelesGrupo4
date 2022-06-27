const jwt = require('../services/jwt')
const bcrypt = require('bcrypt-nodejs'); 
const Habitacion = require('../models/habitaciones.model')

function agregarHabitacion(req, res){ 
    const idHotel = req.params.idHotel; 
    const parametros = req.body;
    const modelHabitacion = new Habitacion();

    if(req.user.rol == 'adminHotel'){
        modelHabitacion.horario = parametros.horario;
        modelHabitacion.precio = parametros.precio; 
        modelHabitacion.caracteristicas = parametros.caracteristicas; 
        modelHabitacion.disponibles = parametros.disponibles; 
        modelHabitacion.tipo = parametros.tipo;
        modelHabitacion.idHotel = req.user.sub; 
        modelHabitacion.save((err, habitacionGuardada)=>{
            if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
            if(!habitacionGuardada) return res.status(404).send({mensaje: 'Hubo un error al guardar la habitacion'})
            return res.status(200).send({habitacion: habitacionGuardada})
        })
    }else{
        return res.status(500).send({mensaje: 'Solo el administrador puede agregar las habitaciones'})
    }
   
}
function obtenerHabitacionesSimple(req, res){
    const idHotel = req.params.idHotel; 
    Habitacion.find({idHotel: idHotel, tipo: 'simple'},(err, habitacionesObtenidas)=>{
        if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
        if(!habitacionesObtenidas) return res.status(404).send({mensaje: 'Hubo un error al obtener las habitaciones'})
        return res.status(200).send({habitaciones: habitacionesObtenidas})
    } )
}
function obtenerHabitacionesMedia(req, res){
    const idHotel = req.params.idHotel; 
    Habitacion.find({idHotel: idHotel, tipo: 'media'},(err, habitacionesObtenidas)=>{
        if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
        if(!habitacionesObtenidas) return res.status(404).send({mensaje: 'Hubo un error al obtener las habitaciones'})
        return res.status(200).send({habitaciones: habitacionesObtenidas})
    } )
}
function obtenerHabitacionesLujosa(req, res){
    const idHotel = req.params.idHotel; 
    Habitacion.find({idHotel: idHotel, tipo: 'lujosa'},(err, habitacionesObtenidas)=>{
        if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
        if(!habitacionesObtenidas) return res.status(404).send({mensaje: 'Hubo un error al obtener las habitaciones'})
        return res.status(200).send({habitaciones: habitacionesObtenidas})
    } )
}
module.exports = {
    agregarHabitacion,
    obtenerHabitacionesSimple,
    obtenerHabitacionesMedia,
    obtenerHabitacionesLujosa
}
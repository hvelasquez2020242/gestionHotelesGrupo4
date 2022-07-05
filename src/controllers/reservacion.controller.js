const Reservacion = require('../models/reservacion.model');
const Habitacion = require('../models/habitaciones.model')
const res = require('express/lib/response');


function agregarReservacion(req, res) {
    const idUsuario = req.user.sub;
    const idHabitacion = req.params.idHabitacion;
    const idCantidadDias = req.params.idCantidadDias;
    const modelReservacion = new Reservacion();

    if (idUsuario !== null) {
        Habitacion.findOne({ _id: idHabitacion }, (err, habitacionEncontrada) => {
            if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
            modelReservacion.idUsuario = idUsuario;
            modelReservacion.tipoDehabitacion = habitacionEncontrada.tipo;
            modelReservacion.cantidadDias = idCantidadDias
            modelReservacion.total = idCantidadDias * habitacionEncontrada.precio;
            modelReservacion.idHotel = habitacionEncontrada.idHotel;

            modelReservacion.save((err, reservacionGuardada) => {
                if (err) return res.status(500).send({ mensaje: 'Hubo un error en la peticion' })
                if (!reservacionGuardada) return res.status(404).send({ mensaje: "Hubo un error al agregar la reservacion" })
                return res.status(200).send({ reservacion: reservacionGuardada })
            })
        })
    } else {
        return res.status(500).send({ mensaje: "Tiene que estar logeado para poder reservar un habitacion" })
    }

}
function obtenerReservaciones(req, res) {
    const idHotel = req.user.sub;

    Reservacion.find({ idHotel: idHotel }, (err, reservacionesEncontradas) => {
        if (err) return res.status(500).send({ mensaje: "Hubo un error en la peticion" })
        if (!reservacionesEncontradas) return res.status(404).send({ mensaje: "Hubo un error al obtener las reservaciones" })
        return res.status(200).send({ reservacion: reservacionesEncontradas })
    
    })

}
function obtenerReservacionId(req, res){
    const idUsuario = req.user.sub; 

    Reservacion.find({ idUsuario: idUsuario}, (err, reservacionObtenida)=>{
        if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
        if(!reservacionObtenida) return res.status(500).send({mensaje: 'Hubo un error al obtener la reservacion'})
        return res.status(200).send({reservacion: reservacionObtenida})
    })
}
module.exports = {
    agregarReservacion,
    obtenerReservacionId,
    obtenerReservaciones
}
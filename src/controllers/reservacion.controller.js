const Reservacion = require('../models/reservacion.model');
const Habitacion = require('../models/habitaciones.model')
const res = require('express/lib/response');
const Factura = require('../models/factura.model');
const Hospedaje = require('../models/hospedados.model')
const Usuario = require('../models/usuario.model');

function agregarReservacion(req, res) {
    const idUsuario = req.user.sub;
    const idHabitacion = req.params.idHabitacion;
    const idCantidadDias = req.params.idCantidadDias;
    const modelReservacion = new Reservacion();

    if (idUsuario !== null) {
        Habitacion.findOne({ idHotel: idHabitacion }, (err, habitacionEncontrada) => {
            if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
            modelReservacion.idUsuario = idUsuario;
            modelReservacion.tipoDehabitacion = habitacionEncontrada.tipo;
            modelReservacion.cantidadDias = idCantidadDias
            modelReservacion.idHabitacion = habitacionEncontrada._id
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
function hacerFactura(req, res){
    const idHospedaje = req.params.idHospedaje;
    const modeloFactura = new Factura()
    Hospedaje.findOne({_id: idHospedaje}, (err, hospedajeEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
        if(!hospedajeEncontrado) return res.status(404).send({mensaje: 'Hubo un error al obtner el hospedaje'})
        Usuario.findOne({_id: hospedajeEncontrado.idUsuario}, (err, usuarioEncontrado)=>{
            if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
            if(!usuarioEncontrado) return res.status(404).send({mensaje: 'Hubo un error al obtener al usuario'})
            modeloFactura.nombre = usuarioEncontrado.nombre; 
            modeloFactura.idUser = usuarioEncontrado._id;
            modeloFactura.tipoDehabitacion = hospedajeEncontrado.tipoDeHabitacion;
            modeloFactura.total = hospedajeEncontrado.total;

            modeloFactura.save((err, facturaAgregada)=>{
                if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
                if(!facturaAgregada) return res.status(404).send({mensaje: 'Hubo un error al agregar la factura'})
                Hospedaje.findByIdAndDelete(idHospedaje,(err, hospedajeEliminado)=>{
                    if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
                    if(!hospedajeEliminado) return res.status(500).send({mensaje: 'Hubo un error al eliminar el hospedaje'})
                    return res.status(200).send({factura: facturaAgregada});
                })
            })
        })
    })
    
}

module.exports = {
    agregarReservacion,
    obtenerReservacionId,
    obtenerReservaciones,
    hacerFactura
}
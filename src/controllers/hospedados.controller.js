const jwt = require('../services/jwt')
const bcrypt = require('bcrypt-nodejs');
const Hospedados = require('../models/hospedados.model')
const Habitacion = require('../models/habitaciones.model')
const Hotel = require('../models/hotel.model');
const Usuario = require('../models/usuario.model');
const Reservacion = require('../models/reservacion.model');

function agregarHospedados(req, res) {
    const idUsuario = req.user.sub;
    const idReservacion = req.params.idReservacion;
    const modelHospedados = new Hospedados();

    if (idUsuario == null) {
        return res.status(500).send({ mensaje: 'necesita estar registrado para poder ser hospedado' })
    } else {
        Reservacion.findOne({ _id: idReservacion }, (err, reservacionEncontrada) => {
            console.log(reservacionEncontrada.idHabitacion);
            if (err) return res.status(500).send({ mensaje: 'Hubo un error en la peticion' })
            if (!reservacionEncontrada) return res.status(404).send({ mensaje: 'Hubo un error al obtener la reservacion' })
            Habitacion.findOne({ _id: reservacionEncontrada.idHabitacion }, (err, habitacionEncontrada) => {
                if (err) return res.status(404).send({ mensaje: 'Hubo un error en la peticion' })
                if (!habitacionEncontrada) return res.status(404).send({ mensaje: 'Hubo un error al obtener la habitacion' })

                Reservacion.findByIdAndDelete({ _id: idReservacion }, (err, reservacionEliminada) => {
                    modelHospedados.idUsuario = idUsuario;
                    modelHospedados.tipoDeHabitacion = habitacionEncontrada.tipo;
                    modelHospedados.cantidadDeDias = reservacionEncontrada.cantidadDias;
                    modelHospedados.total = reservacionEncontrada.cantidadDias * habitacionEncontrada.precio;
                    modelHospedados.idHotel = habitacionEncontrada.idHotel;
                    modelHospedados.save((err, hospedadoGuardado) => {
                        if (err) return res.status(505).send({ mensaje: 'Hubo un error en la peticion' })
                        if (!hospedadoGuardado) return res.status(404).send({ mensaje: 'Hubo un error al agregar a los hospedados' })
                        return res.status(200).send({ hospedado: hospedadoGuardado })
                    })
                })

            })
        })

    }
}
function obtenerhospedajes(req, res) {
    const idAdmin = req.user.sub;

    if (req.user.rol == 'adminHotel') {

        Hotel.findOne({ _id: idAdmin }, (err, hotelEncontrado) => {
            Hospedados.find({ idHotel: hotelEncontrado._id }, (err, hospedadoEncontrado) => {
                if (err) return res.status(500).send({ mensaje: 'Hubo un error en la peticion' })
                if (!hospedadoEncontrado) return res.status(500).send({ mensaje: 'Hubo al obtener a los hospedados' })
                return res.status(200).send({ hospedados: hospedadoEncontrado })
            })
        })
    } else {
        return res.status(500).send({ mensaje: 'Solo los administradores de los hoteles pueden ver a los hospedados' })
    }


}
function agregarServicios(req, res) {
    const idHospedado = req.params.idHospedado;
    const parametros = req.body;
    if (req.user.rol == 'adminHotel') {
        Hospedados.findByIdAndUpdate(idHospedado, { $push: { servicios: { nombre: parametros.nombre, precio: parametros.precio } } }, { new: true }, (err, servicioAgregado) => {
            if (err) return res.status(500).send({ mensaje: 'Hubo un error en la peticion' })
            if (!servicioAgregado) return res.status(404).send({ mensaje: 'Hubo un error al agregar el servicio' })
            return res.status(200).send({ servicio: servicioAgregado }

            )
        })
    } else {
        return res.status(500).send({ mensaje: 'Solo el administrador puede agregar servicios' })
    }

}
function obtenerServicios(req, res){
    const idHospedado = req.params.idHospedado; 
    Hospedados.findOne({_id: idHospedado}, (err, servicioEncontrados) => {
        if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
        if(!servicioEncontrados) return res.status(404).send({ mensaje: 'Hubo un error al buscar el servicio' })
        return res.status(200).send({servicio: servicioEncontrados.servicios})
    })
}
function buscarUsuarioNombre(req, res){
    const nombre = req.params.nombre; 

    Usuario.findOne({ nombre:  { $regex: nombre, $options: "i" }}, (err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
        if(!usuarioEncontrado) return res.status(404).send({mensaje: 'Hubo un error al buscar el usuario'})
        
        Hospedados.find({idUsuario: usuarioEncontrado._id}, (err, hospedajeEncontrado)=>{
            if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
            return res.status(200).send({hospedado: hospedajeEncontrado, usuario: usuarioEncontrado})
        })
    })
}
module.exports = {
    agregarHospedados,
    buscarUsuarioNombre,
    obtenerhospedajes,
    obtenerServicios,
    agregarServicios
}


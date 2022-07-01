const jwt = require('../services/jwt')
const bcrypt = require('bcrypt-nodejs');
const Hospedados = require('../models/hospedados.model')
const Habitacion = require('../models/habitaciones.model')
const Hotel = require('../models/hotel.model')

function agregarHospedados(req, res) {
    const parametros = req.body;
    const idUsuario = req.user.sub;
    const idHabitacion = req.params.idHabitacion;
    const modelHospedados = new Hospedados();

    if (idUsuario == null) {
        return res.status(500).send({ mensaje: 'necesita estar registrado para poder ser hospedado' })
    } else {
        if (parametros.cantidadDeDias) {
            Habitacion.findOne({ _id: idHabitacion }, (err, habitacionEncontrada) => {
                modelHospedados.idUsuario = idUsuario;
                modelHospedados.tipoDeHabitacion = habitacionEncontrada.tipo;
                modelHospedados.cantidadDeDias = parametros.cantidadDeDias;
                modelHospedados.total = parametros.cantidadDeDias * habitacionEncontrada.precio;
                modelHospedados.idHotel = habitacionEncontrada.idHotel;
                modelHospedados.save((err, hospedadoGuardado) => {
                    if (err) return res.status(505).send({ mensaje: 'Hubo un error en la peticion' })
                    if (!hospedadoGuardado) return res.status(404).send({ mensaje: 'Hubo un error al agregar a los hospedados' })
                    return res.status(200).send({ hospedado: hospedadoGuardado })
                })
            })
        } else {
            return res.status(500).send({ mensaje: 'Necesita la cantidad de dias' })
        }

    }
}
function obtenerhospedajes(req, res) {
    const idAdmin = req.user.sub;

    if (req.user.rol == 'adminHotel') {

        Hotel.findOne({ _id: idAdmin }, (err, hotelEncontrado) => {
            Hospedados.findOne({ idHotel: hotelEncontrado._id }, (err, hospedadoEncontrado) => {
                if (err) return res.status(500).send({ mensaje: 'Hubo un error en la peticion' })
                if (!hospedadoEncontrado) return res.status(500).send({ mensaje: 'Hubo al obtener a los hospedados' })
                return res.status(200).send({ hospedados: hospedadoEncontrado })
            })
        })
    }else{ 
        return res.status(500).send({mensaje: 'Solo los administradores de los hoteles pueden ver a los hospedados'})
    }


}
function agregarServicios(req, res){ 
    const idHospedado = req.params.idHospedado;
    const parametro = req.body; 
    if(req.user.rol == 'adminHotel'){
        Hospedados.findByIdAndUpdate(idHospedado, {$push: {servicios:{nombre: parametros.nombre, precio: parametros.precio}}}, {new: true}, (err, servicioAgregado)=>{
            if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
            if(!servicioAgregado) return res.status(404).send({mensaje: 'Hubo un error al agregar el servicio'})
            return res.status(200).send({servicio: servicioAgregado}
                
            )
        })
    }else{
        return res.status(500).send({mensaje: 'Solo el administrador puede agregar servicios'})
    }

}
module.exports = {
    agregarHospedados,
    obtenerhospedajes
}


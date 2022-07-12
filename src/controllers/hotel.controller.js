const jwt = require('../services/jwt')
const bcrypt = require('bcrypt-nodejs');
const Hotel = require('../models/hotel.model')


function agregarHotel(req, res) {
    const rol = req.user.rol;
    const parametros = req.body;
    const modelHotel = new Hotel()

    if (rol == 'SuperAdmin') {
        modelHotel.nombre = parametros.nombre;
        modelHotel.direccion = parametros.direccion;
        modelHotel.descripcion = parametros.descripcion;
        modelHotel.administrador = parametros.administrador;
        modelHotel.password = parametros.password;
        modelHotel.rol = "adminHotel";
        modelHotel.idioma = parametros.idioma;
        modelHotel.telefono = parametros.telefono; 
        modelHotel.puesto = parametros.puesto;

        bcrypt.hash(modelHotel.password, null, null, (err, passwordEncryptada) => {
            modelHotel.password = passwordEncryptada
            modelHotel.save((err, hotelGuardado) => {
                if (err) console.log({ mensaje: 'error en la peticion ' })
                if (!hotelGuardado) console.log({ mensaje: 'error al crear usuario por defecto ' })
                return res.status(200).send({ hotel: hotelGuardado })

            })
        })

    } else {
        return res.status(500).send({ mensaje: 'No tiene el rol necesario para agregar hoteles' })
    }
}
function obtenerHoteles(req, res) {

    Hotel.find({}, (err, hotelesEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Hubo un error en la peticion' })
        if (!hotelesEncontrados) return res.status(404).send({ mensaje: 'Hubo un error en la peticion' })
        return res.status(200).send({ hoteles: hotelesEncontrados })
    })
}
function obtenerHotelesId(req, res) {
    const idHotel = req.params.idHotel
    Hotel.findById({ _id: idHotel }, (err, hotelEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Hubo un error en la peticion' })
        if (!hotelEncontrado) return res.status(404).send({ mensaje: 'Hubo un error al buscar el hotel' })
        return res.status(200).send({ hotel: hotelEncontrado })
    })
}
function editarHotel(req, res) {
    var parametros = req.body;

    if(req.user.rol == 'SuperAdmin'){
        Hotel.findByIdAndUpdate(req.hotel.sub, parametros, { new: true },
            (err, hotelActualizado) => {
                if (err) return res.status(500)
                    .send({ mensaje: 'Error en la peticion' });
                if (!hotelActualizado) return res.status(500)
                    .send({ mensaje: 'Error al editar el Hotel' });
    
                return res.status(200).send({ hotel: hotelActualizado })
            })
    }else{
        return res.status(500).send({ mensaje: "Tienes que ser SuperAdmin para poder editar."})
    }
}
module.exports = {
    agregarHotel,
    obtenerHoteles,
    obtenerHotelesId,
    editarHotel
}
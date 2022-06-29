const jwt = require('../services/jwt')
const Evento = require('../models/evento.model')

function agregarEvento(req, res){
    const parametros = req.body;
    const modelEvento = new Evento();

        modelEvento.nombre = parametros.nombre;
        modelEvento.descripcion = parametros.descripcion;
        modelEvento.tipoDeEvento = parametros.tipoDeEvento; 
        modelEvento.fecha = parametros.fecha; 
        modelEvento.lugar = parametros.lugar; 
        modelEvento.idHotel = req.user.sub; 
        modelEvento.save((err, eventoGuardado)=>{
            if(err) return res.status(200).send({mensaje: 'Hubo un error en la peticion'});
            if(!eventoGuardado) return res.status(404).send({mensaje: 'No se pudo guardar el evento'})
            return res.status(200).send({evento: eventoGuardado})
        })
    
}
function obtenerEventos(req, res){
    Evento.find({idHotel: req.user.sub}, (err, eventoEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
        if(!eventoEncontrado) return res.status(404).send({mensaje: 'Hubo un error al obtener el evento'})
        return res.status(200).send({evento: eventoEncontrado})
    })
}
function obtenerEventosId(req, res){
    const tipoDeEvento = req.params.tipoDeEvento; 
    Evento.findOne({tipoDeEvento: tipoDeEvento}, (err, eventoEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Hubo un en la peticion'})
        if(!eventoEncontrado) return res.status(404).send({mensaje: 'Hubo un error al obtener este tipo de eventos'})
        return res.status(200).send({evento: eventoEncontrado})
    })
}
module.exports={ 
    agregarEvento,
    obtenerEventos,
    obtenerEventosId

}

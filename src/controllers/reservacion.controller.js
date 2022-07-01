const Reservacion = require('../models/reservacion.model')

function agregarReservacion(req, res){
    const parametros = req.body;
    const idUsuario = req.user.sub;
    const idHabitacion = req.params.idHabitacion;

    Reservacion

}
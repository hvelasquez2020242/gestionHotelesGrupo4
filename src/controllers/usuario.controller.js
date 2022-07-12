const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const Hotel = require('../models/hotel.model')


function UsuarioDefault(req, res) {
    var modeloUsuario = new Usuario();
    Usuario.find({ email: "SuperAdmin@gmail.com", nombre: "SuperAdmin" }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length > 0) {
            console.log({ mensaje: "ya se ha creado el usuario del Administrador" })
        } else {
            modeloUsuario.nombre = "SuperAdmin";
            modeloUsuario.email = "SuperAdmin@gmail.com";
            modeloUsuario.password = "123456";
            modeloUsuario.rol = "SuperAdmin";
            bcrypt.hash(modeloUsuario.password, null, null, (err, passwordEncryptada) => {
                modeloUsuario.password = passwordEncryptada
                modeloUsuario.save((err, usuarioGuardado) => {
                    if (err) console.log({ mensaje: 'error en la peticion ' })
                    if (!usuarioGuardado) console.log({ mensaje: 'error al crear usuario por defecto ' })
                    console.log({ Usuario: usuarioGuardado })

                })
            })
        }
    })

}
function Login(req, res) {
    var parametros = req.body;

    Usuario.findOne({ nombre: parametros.nombre }, (err, usuarioencontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion ' });
        if (usuarioencontrado) {
            bcrypt.compare(parametros.password, usuarioencontrado.password, (err, Verificaciondepasswor) => {
                if (Verificaciondepasswor) {
                    if (parametros.obtenerToken == 'true') {
                        return res.status(200).send({ token: jwt.crearToken(usuarioencontrado) })
                    } else {
                        usuarioencontrado.password = undefined;

                        return res.status(200)
                            .send({ usuario: usuarioencontrado })
                    }
                } else {
                    return res.status(500).send({ mensaje: 'la contraseña no coincide' })
                }
            })

        } else {
            Hotel.findOne({ administrador: parametros.nombre }, (err, hotelEncontrado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
                if (hotelEncontrado) {
                    bcrypt.compare(parametros.password, hotelEncontrado.password, (err, verificacion) => {
                        if (verificacion) {
                            if (parametros.obtenerToken == 'true') {
                                return res.status(200).send({ token: jwt.crearToken(hotelEncontrado) })
                            } else {
                                hotelEncontrado.password = undefined
                                return res.status(200).send({ usuario: hotelEncontrado })
                            }
                        } else {
                            return res.status(500).send({ mensaje: 'La contraseña no coincide' })
                        }
                    })
                } else {
                    return res.status(500).send({ mensaje: 'No se encontro el usuario' })
                }
            })
        }
    })
}
function Registro(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario()

    modeloUsuario.nombre = parametros.nombre;
    modeloUsuario.email = parametros.email;
    modeloUsuario.rol = 'usuario';
    bcrypt.hash(parametros.password, null, null, (err, passwordEncryptada) => {
        modeloUsuario.password = passwordEncryptada
        modeloUsuario.save((err, usuarioGuardado) => {
            if (err) console.log({ mensaje: 'error en la peticion ' })
            if (!usuarioGuardado) console.log({ mensaje: 'error al crear usuario por defecto ' })
            return res.status(200).send({ usuario: usuarioGuardado })
        })
    })
}

function editarUsuario(req, res) {
    var idUser = req.params.idUsuario;
    var parametros = req.body;

    if (idUser !== req.user.sub) return res.status(500)
        .send({ mensaje: 'No puede editar otros usuarios' });

    Usuario.findByIdAndUpdate(req.user.sub, parametros, { new: true },
        (err, usuarioActualizado) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if (!usuarioActualizado) return res.status(500)
                .send({ mensaje: 'Error al editar el Usuario' });

            return res.status(200).send({ usuario: usuarioActualizado })
        })
}

function eliminarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    if(idUsuario !== req.user.sub) return res.status(500)
        .send({ mensaje: 'No puede eliminar otros usuarios' });

        Usuario.findByIdAndDelete(idUsuario, (err, usuarioEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!usuarioEliminado) return res.status(500)
            .send({ mensaje: 'Error al eliminar el usuario' })

        return res.status(200).send({ usuario: usuarioEliminado });
    })    
} 

function obtenerUsuarios(req, res) {
    var parametros = req.body; 

    if(req.user.rol == 'SuperAdmin'){
        Usuario.find({ nombre: parametros.nombre }, (err, usuariosEncontrados) => {
            if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
            if(!usuariosEncontrados) return res.status(500)
                .send({ mensaje: 'Error al obtener los usuarios'})
    
            return res.status(200).send({ usuarios: usuariosEncontrados })
        })
    }
    
}
function obtenerUsuariosId(req, res){
    const idUser = req.params.idUsuario;

    Usuario.findOne({_id: idUser}, (err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
        if(!usuarioEncontrado) return res.status(404).send({mensaje: 'No se encontro el usuario'})
        return res.status(200).send({usuario: usuarioEncontrado})
    })
}
function busquerdaUsuarioRol(req, res) {

    if(req.user.rol == 'SuperAdmin'){
        Usuario.find({ rol: "usuario"}, (err, usuariosEncontrados) => {
            if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
            if(!usuariosEncontrados) return res.status(500)
                .send({ mensaje: 'Error al obtener los usuarios'})
    
            return res.status(200).send({ usuarios: usuariosEncontrados })
        })
    }else{
        return res.status(500).send({ mensaje: "Tiene que ser SuperAdmin para buscar un usuario"})
    }
}


module.exports = {
    UsuarioDefault,
    Login,
    Registro,
    editarUsuario,
    eliminarUsuario,
    obtenerUsuarios,
    obtenerUsuariosId,
    busquerdaUsuarioRol
}
const express = require('express');
const usuarioControlador = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/login', usuarioControlador.Login);// Login de Administrador y de Clientes
api.post('/registro', usuarioControlador.Registro)
api.put('/editarUsuario/:idUsuario', md_autenticacion.Auth,  usuarioControlador.editarUsuario)
api.delete('/eliminarUsuario/:idUsuario', md_autenticacion.Auth, usuarioControlador.eliminarUsuario)
api.get('/obtenerUsuarios', md_autenticacion.Auth, usuarioControlador.obtenerUsuarios)
api.get('/obtenerUsuariosId/:idUsuario', md_autenticacion.Auth, usuarioControlador.obtenerUsuariosId)
api.get('/obtenerUsuarioRol' , md_autenticacion.Auth, usuarioControlador.busquerdaUsuarioRol)

module.exports = api;
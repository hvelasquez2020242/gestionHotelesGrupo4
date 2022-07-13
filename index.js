const mongoose = require('mongoose');
const usuarioControlador = require('./src/controllers/usuario.controller');
const app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://daniel:011117Ah@cluster0.f4rsh.mongodb.net/gestionHoteles?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se encuentra conectado a la base de datos.");
    const PORT = process.env.PORT || 3000;
    console.log({PORT});
    app.listen(PORT, function () {
        console.log("Esta corriendo en el puerto" + PORT)
        usuarioControlador.UsuarioDefault();
        
    })
 

}).catch(error => console.log(error));
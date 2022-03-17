const express = require("express");
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();
        
        // Rutas de la aplicacion
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura y parsep del body
        this.app.use( express.json() );

        //Directorio Publico
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.usuariosPath , require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( process.env.PORT, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });

    }

}

module.exports = Server;
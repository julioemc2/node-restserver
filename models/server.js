const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/config");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Connect a base de datos
        this.conectarDB();


        // Middlewares
        this.middlewares();
        
        // Rutas de la aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
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
        this.app.use( this.authPath , require('../routes/auth'));
        this.app.use( this.usuariosPath , require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( process.env.PORT, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });

    }

}

module.exports = Server;
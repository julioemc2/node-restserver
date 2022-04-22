const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {


        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1];

        // Validad la extension
        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extension ${ extension } no es permitida - ${ extensionesValidas }`);
        }

        //res.json({ extension });

        const nombreTemp = uuidv4() + '.' + extension;
        // Subir el archivo
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err); //return res.status(500).json({ err });
            }

            resolve( nombreTemp ); //res.json({ msg: 'File uploaded to ' + uploadPath });
        });

    });




}

module.exports = {
    subirArchivo,
}
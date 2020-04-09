const config = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripción de la tarea a realizar'
    },
    completado: {
        alias: 'c',
        default: true,
        desc: 'Define si la tarea ha sido completada o no'
    }
};

const argv = require('yargs')
    .command('crear', 'Crea una tarea a realizar', {
        descripcion: config.descripcion
    })
    .command('listar', 'Lista todas las tareas por realizar', {
        completado: {...config.completado, default: undefined },
    })
    .command('actualizar', 'Actualiza la tarea', {...config })
    .command('borrar', 'Borra una tarea de la lista', {
        descripcion: config.descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
};
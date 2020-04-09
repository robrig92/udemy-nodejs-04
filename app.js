const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

let command = argv._[0];

switch (command) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log('Tarea creada ' + tarea.descripcion);
        break;
    case 'listar':
        let tareas = porHacer.getListado(argv.completado);
        console.log('Listado de tareas'.yellow);
        console.log('-------------------------'.yellow);
        for (const tarea of tareas) {
            console.log(`${tarea.descripcion} ${tarea.completado ? '- Done'.green : ''}`)
        }
        break;
    case 'actualizar':
        if (porHacer.actualizar(argv.descripcion, argv.completado)) {
            console.log(`${argv.descripcion}` + ` actualizada`.green);
        } else {
            console.log(`No actualizada`.red);
        }
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(`${borrado ? 'borrado' : 'error'}`.yellow);
        break;
    default:
        console.log('comando no reconocido');
        break;
}
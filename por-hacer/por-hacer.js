const fs = require('fs');

let listadoPorHacer = [];

const saveToDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No fue posible almacenar');
    });
}

const loadFromDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    loadFromDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    saveToDB();

    return porHacer;
}

const getListado = (completado = undefined) => {
    loadFromDB();

    if (completado === undefined) {
        return listadoPorHacer;
    }

    completado = completado === 'true' ? true : false;

    return listadoPorHacer.filter(tarea => tarea.completado === completado);
}

const actualizar = (descripcion, completado = true) => {
    loadFromDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index === -1) {
        return false;
    }

    listadoPorHacer[index].completado = completado === 'true' ? true : false;
    saveToDB();

    return true;
}

const borrar = (descripcion) => {
    loadFromDB();

    filteredList = listadoPorHacer.filter((tarea) => tarea.descripcion != descripcion);

    if (filteredList.length === listadoPorHacer.length) {
        return false;
    }

    listadoPorHacer = filteredList;
    saveToDB();
    return true;
}

module.exports = {
    crear,
    borrar,
    actualizar,
    getListado,
};
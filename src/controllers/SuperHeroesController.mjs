import {
    obtenerSuperheroePorId, obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30,
    crearSuperheroe, actualizarSuperheroe, eliminarSuperheroePorId,
    eliminarSuperheroePorNombre
} from '../services/SuperHeroesService.mjs';

import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/ResponseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).send({ mensaje: 'ID es requerido' });

        const superheroe = await obtenerSuperheroePorId(id);
        if (!superheroe) return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });

        res.status(200).json(renderizarSuperheroe(superheroe));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        res.status(200).json(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        if (!atributo || !valor) {
            return res.status(400).send({ mensaje: 'Atributo y valor son requeridos' });
        }

        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (!superheroes.length) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
        }

        res.status(200).json(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if (!superheroes.length) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }

        res.status(200).json(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });
    }
}

export async function crearSuperheroeController(req, res) {
    try {
        const { nombre, edad, poderes, planetaOrigen } = req.body;
        if (!nombre || !edad || !poderes || !planetaOrigen) {
            return res.status(400).send({ mensaje: 'Todos los campos son requeridos' });
        }

        const superheroe = await crearSuperheroe(req.body);
        res.status(201).json(renderizarSuperheroe(superheroe));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al crear el superhéroe', error: error.message });
    }
}

export async function actualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).send({ mensaje: 'ID es requerido' });

        const superheroeActualizado = await actualizarSuperheroe(id, req.body);
        if (!superheroeActualizado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        res.status(200).json(renderizarSuperheroe(superheroeActualizado));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al actualizar el superhéroe', error: error.message });
    }
}

export async function eliminarSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).send({ mensaje: 'ID es requerido' });

        const superheroeEliminado = await eliminarSuperheroePorId(id);
        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        res.status(200).json({ mensaje: 'Superhéroe eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message });
    }
}

export async function eliminarSuperheroePorNombreController(req, res) {
    try {
        const { nombre } = req.params;
        if (!nombre) return res.status(400).send({ mensaje: 'Nombre es requerido' });

        const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);
        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        res.status(200).json({ mensaje: 'Superhéroe eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message });
    }
}


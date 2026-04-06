import Superhero from "../models/superhero.mjs";
import {
	actualizarSuperheroePorId,
	agregarNuevoSuperheroe,
	buscarSuperheoresPorAtributo,
	eliminarSuperheroePorId,
	eliminarSuperheroePorNombre,
	obtenerSuperheroePorId,
	obtenerSuperheroesMayoresDe30,
	obtenerTodosLosSuperheroes,
} from "../services/superheroService.mjs";

import {
	renderizarlistaSuperheroes,
	renderizarSuperheroe,
} from "../views/responseView.mjs";

// OBTENER SUPERHÉROE POR ID
export async function obtenerSuperheroePorIdController(req, res) {
	try {
		const { id } = req.params;
		const superheroe = await obtenerSuperheroePorId(id);
		if (superheroe === null) {
			res.status(404).send({ mensaje: "Superhéroe no encontrado" });
		} else {
			const superheroeFormateado = renderizarSuperheroe(superheroe);
			res.status(200).json(superheroeFormateado);
		}
	} catch (err) {
		res.status(500).send({
			mensaje: "Error al buscar el superhéroe",
			err: err.mensaje,
		});
	}
}

// OBTENER TODOS LOS SUPERHÉROES
export async function obtenerTodosLosSuperheroesController(_req, res) {
	try {
		const superheroes = await obtenerTodosLosSuperheroes();
		const superheroesFormateados = renderizarlistaSuperheroes(superheroes);
		res.status(200).json(superheroesFormateados);
	} catch (err) {
		res.status(500).send({
			mensaje: "Error al obtener todos los superhéroes",
			err: err.mensaje,
		});
	}
}

// BUSCAR SUPERHÉROE POR ATRIBUTO Y VALOR
export async function buscarSuperheoresPorAtributoController(req, res) {
	try {
		const { atributo, valor } = req.params;
		const superheroes = await buscarSuperheoresPorAtributo(atributo, valor);
		if (superheroes.length === 0) {
			res.status(404).send({
				mensaje: "No se encontraros superhéroes con ese atributo",
			});
		} else {
			const superheroesFormateados = renderizarlistaSuperheroes(superheroes);
			res.status(200).json(superheroesFormateados);
		}
	} catch (err) {
		res.status(500).send({
			mensaje: "Error al buscar sueperhéroes por atributo",
			err: err.mensaje,
		});
	}
}

// OBTENER SUEPERHÉROES MAYORES DE 30
export async function obtenerSuperheroesMayoresDe30Controller(_req, res) {
	try {
		const superheroes = await obtenerSuperheroesMayoresDe30();
		if (superheroes.length === 0) {
			res.status(404).send({
				mensaje: "No se encontraron superhéroes mayores a 30 años",
			});
		} else {
			const superheroesFormateados = renderizarlistaSuperheroes(superheroes);
			res.status(200).json(superheroesFormateados);
		}
	} catch (err) {
		res.status(500).send({
			mensaje: "Error al buscar superhéros mayores a 30 años",
			err: err.mansaje,
		});
	}
}

// AGREGAR NUEVO SUPERHÉROE
export async function agregarNuevoSuperheroeController(_req, res) {
	try {
		// Crear nuevo superhéroe
		const nuevoSuperheroe = new Superhero({
			nombreSuperheroe: "Black Panther",
			nombreReal: "T'Challa",
			edad: 35,
			planetaOrigen: "Tierra",
			debilidad: "Vibranium anti-metal",
			poderes: [
				"Traje de vibranium",
				"Superfuerza",
				"Superagilidad",
				"Sentidos mejorados",
				"Maestro en artes marciales",
			],
			aliados: ["Capitán América", "Iron Man", "Okoye"],
			enemigos: ["Killmonger", "Ulysses Klaue", "M'Baku"],
			creador: "Stan Lee",
		});
		// Agregar superhéroe a la db
		await agregarNuevoSuperheroe(nuevoSuperheroe);
		const nuevoSuperheroeFormateado = renderizarSuperheroe(nuevoSuperheroe);
		res.status(200).json(nuevoSuperheroeFormateado);
	} catch (err) {
		res.status(500).send({
			mensaje: "Error al agregar el nuevo superheroe",
			err: err.mensaje,
		});
	}
}

// ALIMINAR SUPERHÉROE POR NOMBRE
export async function eliminarSuperheroePorNombreController(req, res) {
	try {
		const { nombreSuperheroe } = req.params;
		const superheroeEliminado =
			await eliminarSuperheroePorNombre(nombreSuperheroe);
		if (!superheroeEliminado) {
			res.status(404).send({
				mensaje: `No se encotró el superhéroe ${nombreSuperheroe}, no se puede eliminar`,
			});
		} else {
			const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
			res.status(200).json(superheroeFormateado);
		}
	} catch (err) {
		res.status(500).send({
			mensaje: "Error al eliminar el superheroe",
			err: err.mensaje,
		});
	}
}

// ELIMINAR SUPERHÉROE POR ID
export async function eliminarSuperheroePorIdController(req, res) {
	try {
		const { id } = req.params;
		console.log(id);
		const superheroeEliminado = await eliminarSuperheroePorId(id);
		console.log(superheroeEliminado);
		if (!superheroeEliminado) {
			res.status(404).send({
				mensaje: "Nose encontró el superhéroe, no se puede eliminar",
			});
		} else {
			const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
			res.status(200).json(superheroeFormateado);
		}
	} catch (err) {
		res.status(500).send({
			mensaje: "Error al elminar el superhéroe",
			err: err.mensaje,
		});
	}
}

// ACTUALIZAR SUPERHÉROE POR ID (con el método findByIdAndUpdate())
export async function actualizarSuperheroePorIdController(req, res) {
	try {
		const { id } = req.params;
		// findByIdAndUpdate retorna el supeheroe devuelve el documento original (antes de ser actualizado)
		const superheroeEncotrado = await actualizarSuperheroePorId(id, {
			$set: { edad: 300 },
		});

		// Verificar si se encontró el superheroe
		if (superheroeEncotrado === null) {
			res.status(404).send({
				mensaje: "No se encontró el superhéroe, no se pudo actualizar",
			});
		} else {
			const superheroes = await obtenerTodosLosSuperheroes();
			const superheroesFormateados = renderizarlistaSuperheroes(superheroes);
			res.status(200).json(superheroesFormateados);
		}
	} catch (err) {
		res.status(500).send({
			mensaje: "Error al actualizar el superhéroe",
			err: err.mensaje,
		});
	}
}

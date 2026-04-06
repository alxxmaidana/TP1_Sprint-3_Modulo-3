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
			return res.status(404).send({ mesagge: "Superhéroe no encontrado" });
		} else {
			const superheroeFormateado = renderizarSuperheroe(superheroe);
			res.status(200).json(superheroeFormateado);
		}
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al buscar el superhéroe",
			err: err.mesagge,
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
			mesagge: "Error al obtener todos los superhéroes",
			err: err.mesagge,
		});
	}
}

// BUSCAR SUPERHÉROE POR ATRIBUTO Y VALOR
export async function buscarSuperheoresPorAtributoController(req, res) {
	try {
		const { atributo, valor } = req.params;
		const superheroes = await buscarSuperheoresPorAtributo(atributo, valor);
		if (superheroes.length === 0) {
			return res.status(404).send({
				mesagge: "No se encontraros superhéroes con ese atributo",
			});
		} else {
			const superheroesFormateados = renderizarlistaSuperheroes(superheroes);
			res.status(200).json(superheroesFormateados);
		}
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al buscar sueperhéroes por atributo",
			err: err.mesagge,
		});
	}
}

// OBTENER SUEPERHÉROES MAYORES DE 30
export async function obtenerSuperheroesMayoresDe30Controller(_req, res) {
	try {
		const superheroes = await obtenerSuperheroesMayoresDe30();
		if (superheroes.length === 0) {
			return res.status(404).send({
				mesagge: "No se encontraron superhéroes mayores a 30 años",
			});
		} else {
			const superheroesFormateados = renderizarlistaSuperheroes(superheroes);
			res.status(200).json(superheroesFormateados);
		}
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al buscar superhéros mayores a 30 años",
			err: err.mesagge,
		});
	}
}

// AGREGAR NUEVO SUPERHÉROE
export async function agregarNuevoSuperheroeController(_req, res) {
	try {
		// Crear nuevo superhéroe
		const nuevoSuperheroe = new Superhero({
			nombreSuperheroe: "Silver Surfer",
			nombreReal: "Norrin Radd",
			edad: 10000,
			planetaOrigen: "Zenn-La",
			debilidad: "Barrera cósmica que lo confina a la Tierra",
			poderes: [
				"Poder Cósmico",
				"Vuelo interestelar",
				"Manipulación de energía",
				"Casi inmortalidad",
				"Tabla de plata indestructible",
			],
			aliados: ["Fantastic Four", "Thor", "Adam Warlock"],
			enemigos: ["Galactus", "Thanos", "Mephisto"],
			creador: "Jack Kirby",
		});
		// Agregar superhéroe a la DB
		await agregarNuevoSuperheroe(nuevoSuperheroe);
		const nuevoSuperheroeFormateado = renderizarSuperheroe(nuevoSuperheroe);
		res.status(200).json(nuevoSuperheroeFormateado);
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al agregar el nuevo superheroe",
			err: err.mesagge,
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
			return res.status(404).send({
				mesagge: `No se encotró el superhéroe ${nombreSuperheroe}, no se puede eliminar`,
			});
		} else {
			const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
			res.status(200).json(superheroeFormateado);
		}
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al eliminar el superheroe",
			err: err.mesagge,
		});
	}
}

// ELIMINAR SUPERHÉROE POR ID
export async function eliminarSuperheroePorIdController(req, res) {
	try {
		const { id } = req.params;
		const superheroeEliminado = await eliminarSuperheroePorId(id);
		if (!superheroeEliminado) {
			return res.status(404).send({
				mesagge: "Nose encontró el superhéroe, no se puede eliminar",
			});
		} else {
			const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
			res.status(200).json(superheroeFormateado);
		}
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al elminar el superhéroe",
			err: err.mesagge,
		});
	}
}

// ACTUALIZAR SUPERHÉROE POR ID
export async function actualizarSuperheroePorIdController(req, res) {
	try {
		const { id } = req.params;
		// findByIdAndUpdate retorna el supeheroe devuelve el documento original (antes de ser actualizado)
		const superheroeEncotrado = await actualizarSuperheroePorId(id, {
			$set: { nombreSuperheroe: "Negra Viuda" },
		});

		// Verificar si se encontró el superheroe
		if (superheroeEncotrado === null) {
			return res.status(404).send({
				mesagge: "No se encontró el superhéroe, no se pudo actualizar",
			});
		} else {
			const superheroes = await obtenerTodosLosSuperheroes();
			const superheroesFormateados = renderizarlistaSuperheroes(superheroes);
			res.status(200).json(superheroesFormateados);
		}
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al actualizar el superhéroe",
			err: err.mesagge,
		});
	}
}

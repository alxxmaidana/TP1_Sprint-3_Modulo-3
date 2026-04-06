import express from "express";

import {
	actualizarSuperheroePorIdController,
	agregarNuevoSuperheroeController,
	buscarSuperheoresPorAtributoController,
	eliminarSuperheroePorIdController,
	eliminarSuperheroePorNombreController,
	obtenerSuperheroePorIdController,
	obtenerSuperheroesMayoresDe30Controller,
	obtenerTodosLosSuperheroesController,
} from "../controllers/superheroController.mjs";

const router = express.Router();

// Obtener todos los superhéroes de la colección
router.get("/heroes", obtenerTodosLosSuperheroesController);

// Ruta para buscar y leer un superhéroe por _id
router.get("/heroes/buscar/id/:id", obtenerSuperheroePorIdController);

// Obtener superhéroes mayores de 30, sean el planeta tierra y tengan almenos 2 poderes
router.get("/heroes/mayores-30", obtenerSuperheroesMayoresDe30Controller);

// Ruta para buscar superhéroes por atributo y valor
router.get(
	"/heroes/buscar/:atributo/:valor",
	buscarSuperheoresPorAtributoController,
);

// Agregar un nuevo superhéroe
router.post("/heroes", agregarNuevoSuperheroeController);

// Actualizar documento por ID
router.put("/heroes/actualizar/:id", actualizarSuperheroePorIdController);

// Ruta para eliminar un superheroe por su nombre de superhéroe
router.delete(
	"/heroes/eliminar/:nombreSuperheroe",
	eliminarSuperheroePorNombreController,
);

// Eliminar un superhéroe por id
router.delete("/heroes/eliminar/id/:id", eliminarSuperheroePorIdController);

export default router;

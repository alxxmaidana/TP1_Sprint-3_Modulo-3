# Trabajo Práctino 1 - Sprint 3

## Estructura del proyecto:
```
README.md
src/
	app.mjs
	config/
		dbConfig.mjs
	controllers/
		supeheroController.mjs
	models/
		superhero.mjs
	repositories/
		IRepository.mjs
		SuperheroRepository.mjs
	routes/
		superheroRoutes.mjs
	services/
		superheroService.mjs
	views/
		responseView.mjs
```
---

## Requerimientos del sistema:
1. Agregar un endpoint que al realizarle una peticion `GET` que *nos devuelva todos los superheroes*

2. Agregar un endpoint que al realizarle una peticion `POST` *cree e inserte un nuevo superheroe en la base de datos, y nos devuelva el superheroe creado*

3. Agregar un endpoint que al realizarle una peticion `PUT` *actualice un superheroe en la base de datos, y nos devuelva todos el superheroe actualizados*

4. Agregar un endpoint que al realizarle una peticion `DELETE` *borre un superheroe por `ID` en la base de datos, y nos devuelva el superheroe borrado*

5. Agregar un endpoint que al realizarle una peticion `DELETE` *borre un superheroe por Nombre del superheroe en la base de datos, y nos devuelva el superheroe borrado*

6. Subir todo a su repositorio de github y cargarlo en la plataforma Epixum
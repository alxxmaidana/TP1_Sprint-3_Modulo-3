# Trabajo Práctino 1 - Sprint 3

## Estructura del proyecto:

```
README.md
src/
	app.mjs
	package.json
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

## Configuración de la Conexión a la base de datos MongoDB:

**Archivo:** `src/config/dbConfig.mjs`

**Funcionalidad:** Este archivo configura la conexión centralizada a MongoDB, permitiendo que la aplicación
tenga una *única instancia de conexión que puede ser utilizada en cualquier parte del proyecto*.

---

## Modelo de datos:

**Archivo: `src/models/superhero.mjs`**

**Funcionalidad:** Define el modelo de datos para superheroes utilizando Mongoose, estableciendo la
estructura y las reglas de validacion para los documentos que seran almacenados en MongoDB.

---

## Capa de persistencia y su interfaz

**Archivo de interfaz `src/repositories/IRepository.mjs`** 

**Funcionalidad:** Establece una interfaz que define métodos CRUD estándar y sirve como
contrato para asegurar que cualquier clase que implemente la interfaz cuente con estos métodos.

**Archivo de implementación `src/repositories/SuperheroRepository.mjs`**

**Funcionalidad:** SuperHeroRepository.mjs implementa los métodos definidos en la interfaz,
interactuando directamente con MongoDB a través de Mongoose para realizar operaciones de datos.

---

## Capa de servicio

**Archivo: `src/services/superheroService.mjs`**

**Funcionalidad:** Este archivo implementa la lógica de negocio, utilizando los métodos del repositorio para
recuperar, buscar y filtrar datos de los superhéroes.

---

## Controlador

**Funcionalidad:** Este archivo implementa el controlador para gestionar las solicitudes HTTP, llamando a los
servicios correspondientes y utilizando las vistas para presentar los datos.

---

## Configuración de la capa de vista

**Archivo: `src/views/responseView.mjs`**

**Funcionalidad**: Este archivo define las funciones de presentación de los datos, organizando la información
de los superhéroes en un formato estructurado.

---

## Configuración de Rutas

**Archivo: `src/routes/superheroRoutes.mjs`**

**Funcionalidad:** Este archivo define las rutas necesarias para cada operación del controlador.

---

## Configuración del Servidor

**Archivo: `src/app.mjs`**

**Funcionalidad:** Inicializa el servidor, conecta a la base de datos, y carga las rutas para gestionar todas las
solicitudes relacionadas con superhéroes.

--- 

## Requerimientos del sistema:
1. Agregar un endpoint que al realizarle una peticion `GET` que *nos devuelva todos los superheroes*

2. Agregar un endpoint que al realizarle una peticion `POST` *cree e inserte un nuevo superheroe en la base de datos, y nos devuelva el superheroe creado*

3. Agregar un endpoint que al realizarle una peticion `PUT` *actualice un superheroe en la base de datos, y nos devuelva todos el superheroe actualizados*

4. Agregar un endpoint que al realizarle una peticion `DELETE` *borre un superheroe por `ID` en la base de datos, y nos devuelva el superheroe borrado*

5. Agregar un endpoint que al realizarle una peticion `DELETE` *borre un superheroe por Nombre del superheroe en la base de datos, y nos devuelva el superheroe borrado*

6. Subir todo a su repositorio de github y cargarlo en la plataforma Epixum
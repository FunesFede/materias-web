import { db } from "/firebase/config"; // Asegúrate de importar 'db'
import { doc, setDoc, arrayUnion, arrayRemove, onSnapshot, getDoc } from "firebase/firestore"; // Añado getDoc
import asignaturasData from "../../data/asignaturas.json";

// Define el path base para el documento de arrays de asignaturas
export const getAsignaturaDocRef = (userId) => {
	// RUTA SOLICITADA: /users/{userId}/asignaturas/data
	return doc(db, "users", userId, "asignaturas", "data");
};

// ******************************************************
// FUNCIONES DE LECTURA (READ)
// ******************************************************

/**
 * Establece un listener en tiempo real para obtener los arrays de asignaturas.
 * @param {string} userId - ID del usuario actual.
 * @param {function} callback - Función a ejecutar con los datos (ej: setAsignaturaData).
 * @param {function} onError - Función a ejecutar si hay un error.
 * @returns {function} Función de 'unsubscribe' para limpiar el listener.
 */
export const getAsignaturas = (userId, callback, onError) => {
	if (!userId) {
		if (onError) onError(new Error("UserID no proporcionado."));
		return () => {}; // Devuelve una función vacía para el cleanup
	}

	const docRef = getAsignaturaDocRef(userId);

	// onSnapshot es el método para listeners en tiempo real
	const unsubscribe = onSnapshot(
		docRef,
		(docSnap) => {
			if (docSnap.exists()) {
				const data = docSnap.data();
				// Asegura que los arrays existan, usando un array vacío si son nulos/undefined
				callback({
					regularizadas: data.regularizadas || [],
					aprobadas: data.aprobadas || [],
				});
			} else {
				// Documento no existe, devuelve arrays vacíos
				callback({
					regularizadas: [],
					aprobadas: [],
				});
			}
		},
		(error) => {
			console.error("Error en onSnapshot de asignaturas:", error);
			if (onError) onError(error);
		}
	);

	return unsubscribe;
};

/**
 * Obtiene los arrays de asignaturas una sola vez (útil para lógica recursiva).
 * @param {string} userId - ID del usuario actual.
 * @returns {Promise<{regularizadas: string[], aprobadas: string[]}>}
 */
const getAsignaturasOnce = async (userId) => {
	if (!userId) throw new Error("UserID no proporcionado para la lectura única.");
	const docRef = getAsignaturaDocRef(userId);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const data = docSnap.data();
		return {
			regularizadas: data.regularizadas || [],
			aprobadas: data.aprobadas || [],
		};
	}
	return { regularizadas: [], aprobadas: [] };
};

// ******************************************************
// FUNCIÓN DE BORRADO RECURSIVO (DELETE)
// ******************************************************

/**
 * Borra una asignatura y recursivamente todas las que dependan de ella.
 * Utiliza promesas y llamadas atómicas a Firestore.
 * * @param {string} userId - ID del usuario actual.
 * @param {string} acronimo - El acrónimo de la asignatura a borrar (ej: 'AM').
 * @param {Array<{acronimo: string, regularizadas: string[], aprobadas: string[]}>} allAsignaturasData - El JSON completo de asignaturas para la verificación de dependencias.
 * @param {Set<string>} [visited=new Set()] - Set para prevenir la recursión infinita.
 */
export const borrarAsignaturaRecursivo = async (userId, acronimo, allAsignaturasData, visited = new Set()) => {
	if (!userId || !acronimo) {
		console.error("Faltan argumentos esenciales para la función de borrado.");
		return;
	}

	if (!allAsignaturasData) {
		allAsignaturasData = asignaturasData;
	}

	const acronimoUpperCase = acronimo.toUpperCase();

	// 1. Prevenir recursión infinita
	if (visited.has(acronimoUpperCase)) {
		return;
	}
	visited.add(acronimoUpperCase);

	console.log(`[BORRANDO] Procesando acrónimo: ${acronimoUpperCase}`);

	// 2. Borrar la asignatura actual de las listas del usuario
	await Promise.all([removeRegularizada(userId, acronimoUpperCase), removeAprobada(userId, acronimoUpperCase)]);

	// 3. Obtener el estado actual de las asignaturas del usuario (una sola vez)
	// Aunque ya borramos el acronimo actual, necesitamos el estado actual
	// para saber qué asignaturas *del usuario* debemos revisar.
	const currentState = await getAsignaturasOnce(userId);
	const userAsignaturas = [...currentState.regularizadas, ...currentState.aprobadas];

	// 4. Buscar asignaturas que dependan de la que se está borrando (RECURSIVIDAD)
	const asignaturasAfectadas = allAsignaturasData.filter((asignatura) => {
		const dependsOnCurrent = asignatura.regularizadas.includes(acronimoUpperCase) || asignatura.aprobadas.includes(acronimoUpperCase);
		// Solo borramos recursivamente si la asignatura dependiente EXISTE en las listas del usuario
		return dependsOnCurrent && userAsignaturas.includes(asignatura.acronimo.toUpperCase());
	});

	console.log(`[DEPENDENCIA] ${asignaturasAfectadas.length} asignaturas dependientes encontradas para ${acronimoUpperCase}.`);

	// 5. Borrar recursivamente las asignaturas afectadas
	const recursiveDeletions = asignaturasAfectadas.map((asignatura) => borrarAsignaturaRecursivo(userId, asignatura.acronimo, allAsignaturasData, visited));

	await Promise.all(recursiveDeletions);

	// El listener (onSnapshot) en el componente React se encargará de actualizar la UI
	console.log(`[COMPLETADO] Borrado recursivo terminado para ${acronimoUpperCase}.`);
};

// ******************************************************
// FUNCIONES DE REGULARIZADAS (CREATE / DELETE)
// ******************************************************

/**
 * Añade un acrónimo (string) a la lista de asignaturas regularizadas.
 * Usa arrayUnion para evitar duplicados y sobrescribir el array.
 * @param {string} userId - ID del usuario actual.
 * @param {string} acronimo - El string a añadir (ej: 'AM').
 */
export const addRegularizada = async (userId, acronimo) => {
	if (!userId || !acronimo) {
		console.error("Faltan userId o acronimo.");
		return false;
	}

	const acronimoUpperCase = acronimo.toUpperCase();
	const docRef = getAsignaturaDocRef(userId);

	try {
		// arrayUnion añade el elemento solo si no existe
		await setDoc(
			docRef,
			{
				regularizadas: arrayUnion(acronimoUpperCase),
			},
			{ merge: true } // Mantiene los otros campos del documento (como 'aprobadas')
		);

		console.log(`Añadido ${acronimoUpperCase} a regularizadas.`);
		return true;
	} catch (error) {
		console.error("Error al añadir regularizada:", error);
		return false;
	}
};

/**
 * Quita un acrónimo (string) de la lista de asignaturas regularizadas.
 * Usa arrayRemove para eliminar el elemento.
 * @param {string} userId - ID del usuario actual.
 * @param {string} acronimo - El string a quitar (ej: 'AM').
 */
export const removeRegularizada = async (userId, acronimo) => {
	if (!userId || !acronimo) {
		console.error("Faltan userId o acronimo.");
		return false;
	}

	const acronimoUpperCase = acronimo.toUpperCase();
	const docRef = getAsignaturaDocRef(userId);

	try {
		await setDoc(
			docRef,
			{
				regularizadas: arrayRemove(acronimoUpperCase),
			},
			{ merge: true }
		);

		console.log(`Removido ${acronimoUpperCase} de regularizadas.`);
		return true;
	} catch (error) {
		console.error("Error al quitar regularizada:", error);
		return false;
	}
};

// ******************************************************
// FUNCIONES DE APROBADAS (CREATE / DELETE)
// ******************************************************

/**
 * Añade un acrónimo (string) a la lista de asignaturas aprobadas.
 * @param {string} userId - ID del usuario actual.
 * @param {string} acronimo - El string a añadir.
 */
export const addAprobada = async (userId, acronimo) => {
	if (!userId || !acronimo) return;

	const docRef = getAsignaturaDocRef(userId);
	try {
		await setDoc(
			docRef,
			{
				aprobadas: arrayUnion(acronimo.toUpperCase()),
			},
			{ merge: true }
		);
		console.log(`Añadido ${acronimo.toUpperCase()} a aprobadas.`);
		return true;
	} catch (error) {
		console.error("Error al añadir aprobada:", error);
		return false;
	}
};

/**
 * Quita un acrónimo (string) de la lista de asignaturas aprobadas.
 * @param {string} userId - ID del usuario actual.
 * @param {string} acronimo - El string a quitar.
 */
export const removeAprobada = async (userId, acronimo) => {
	if (!userId || !acronimo) return;

	const docRef = getAsignaturaDocRef(userId);
	try {
		await setDoc(
			docRef,
			{
				aprobadas: arrayRemove(acronimo.toUpperCase()),
			},
			{ merge: true }
		);
		console.log(`Removido ${acronimo.toUpperCase()} de aprobadas.`);
		return true;
	} catch (error) {
		console.error("Error al quitar aprobada:", error);
		return false;
	}
};

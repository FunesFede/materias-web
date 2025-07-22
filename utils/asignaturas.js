import asignaturas from "../data/asignaturas.json";

function esRegularizada(acronimo) {
	let regularizadas = localStorage.getItem("regularizadas");
	let aprobadas = localStorage.getItem("aprobadas");

	if (!regularizadas) {
		regularizadas = [];
	} else {
		regularizadas = regularizadas.split(",");
	}
	if (!aprobadas) {
		aprobadas = [];
	} else {
		aprobadas = aprobadas.split(",");
	}

	return regularizadas.includes(acronimo) || aprobadas.includes(acronimo);
}

function esAprobada(acronimo) {
	let aprobadas = localStorage.getItem("aprobadas");

	if (!aprobadas) {
		aprobadas = [];
	} else {
		aprobadas = aprobadas.split(",");
	}

	return aprobadas.includes(acronimo);
}

function borrar(acronimo, visited = new Set(), regularizadas = null, aprobadas = null, isRoot = true) {
	// Prevenir recursión infinita
	if (visited.has(acronimo)) {
		return { regularizadas, aprobadas };
	}
	visited.add(acronimo);

	// Solo leer de localStorage en la llamada inicial
	if (regularizadas === null || aprobadas === null) {
		let regStr = localStorage.getItem("regularizadas");
		let aprStr = localStorage.getItem("aprobadas");

		if (!regStr) {
			regularizadas = [];
		} else {
			regularizadas = regStr.split(",");
		}
		if (!aprStr) {
			aprobadas = [];
		} else {
			aprobadas = aprStr.split(",");
		}
	}

	// Remover la asignatura actual de las listas
	if (regularizadas.includes(acronimo)) {
		const index = regularizadas.indexOf(acronimo);
		if (index > -1) {
			regularizadas.splice(index, 1);
		}
	}

	if (aprobadas.includes(acronimo)) {
		const index = aprobadas.indexOf(acronimo);
		if (index > -1) {
			aprobadas.splice(index, 1);
		}
	}

	// Buscar asignaturas que dependan de la que se está borrando
	const asignaturasAfectadas = asignaturas.filter((asignatura) => asignatura.regularizadas.includes(acronimo) || asignatura.aprobadas.includes(acronimo));

	// Borrar recursivamente las asignaturas que dependían de esta
	for (const asignatura of asignaturasAfectadas) {
		const resultado = borrar(asignatura.acronimo, visited, regularizadas, aprobadas, false);
		regularizadas = resultado.regularizadas;
		aprobadas = resultado.aprobadas;
	}

	// Guardar solo si es la llamada inicial
	if (isRoot) {
		localStorage.setItem("regularizadas", regularizadas.join(","));
		localStorage.setItem("aprobadas", aprobadas.join(","));

		// Dispatch custom event to trigger component refresh
		window.dispatchEvent(new Event("localStorageUpdate"));
	}

	return { regularizadas, aprobadas };
}

const regularizar = (acronimo) => {
	console.log(acronimo);
	let regularizadas = localStorage.getItem("regularizadas");

	if (!regularizadas) {
		regularizadas = [];
	} else {
		regularizadas = regularizadas.split(",");
	}
	console.log(regularizadas);

	regularizadas.push(acronimo);
	localStorage.setItem("regularizadas", regularizadas);

	// Dispatch custom event to trigger component refresh
	window.dispatchEvent(new Event("localStorageUpdate"));
};

const aprobar = (acronimo) => {
	let aprobadas = localStorage.getItem("aprobadas");

	if (!aprobadas) {
		aprobadas = [];
	} else {
		aprobadas = aprobadas.split(",");
	}

	aprobadas.push(acronimo);
	localStorage.setItem("aprobadas", aprobadas);

	// Dispatch custom event to trigger component refresh
	window.dispatchEvent(new Event("localStorageUpdate"));
};

export default { regularizar, aprobar, esRegularizada, esAprobada, borrar };

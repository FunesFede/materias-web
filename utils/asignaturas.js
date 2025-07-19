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

function borrar(acronimo) {
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

	if (regularizadas.includes(acronimo)) {
		const index = regularizadas.indexOf(acronimo);
		if (index > -1) {
			// only splice array when item is found
			regularizadas.splice(index, 1); // 2nd parameter means remove one item only
		}
	}

	if (aprobadas.includes(acronimo)) {
		const index = aprobadas.indexOf(acronimo);
		if (index > -1) {
			// only splice array when item is found
			aprobadas.splice(index, 1); // 2nd parameter means remove one item only
		}
	}

	localStorage.setItem("regularizadas", regularizadas);
	localStorage.setItem("aprobadas", aprobadas);

	// Dispatch custom event to trigger component refresh
	window.dispatchEvent(new Event("localStorageUpdate"));
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

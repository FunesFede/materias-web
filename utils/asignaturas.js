export function esHecha(asignaturas, asignatura) {
	return asignaturas.regularizadas.includes(asignatura.acronimo) || asignaturas.aprobadas.includes(asignatura.acronimo);
}

export function esCursable(asignaturas, asignatura) {
	for (let index = 0; index < asignatura.regularizadas.length; index++) {
		const element = asignatura.regularizadas[index];
		if (!asignaturas.regularizadas.includes(element) && !asignaturas.aprobadas.includes(element)) return false;
	}

	for (let index = 0; index < asignatura.aprobadas.length; index++) {
		const element = asignatura.aprobadas[index];
		if (!asignaturas.aprobadas.includes(element)) return false;
	}

	return true;
}

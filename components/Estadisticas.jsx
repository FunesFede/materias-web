import React, { useEffect, useState } from "react";
import asignaturas from "../data/asignaturas.json";

export default function Estadisticas() {
	const [refreshKey, setRefreshKey] = useState(0);
	let regularizadas = localStorage.getItem("regularizadas");
	let aprobadas = localStorage.getItem("aprobadas");

	if (!regularizadas) regularizadas = [];
	else regularizadas = regularizadas.split(",");
	if (!aprobadas) aprobadas = [];
	else aprobadas = aprobadas.split(",");

	const regularizadasYAprobadas = new Set([...regularizadas, ...aprobadas]);

	useEffect(() => {
		const handleStorageChange = () => {
			setRefreshKey((prev) => prev + 1);
		};

		window.addEventListener("storage", handleStorageChange);

		// Custom event for same-tab localStorage changes
		window.addEventListener("localStorageUpdate", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
			window.removeEventListener("localStorageUpdate", handleStorageChange);
		};
	}, []);

	return (
		<div className='container-fluid bg-dark2 rounded my-4 py-2 text-white'>
			<div className='row mb-3'>
				<h4>
					<i className='bi bi-graph-up'></i> Tus Estadísticas
				</h4>
			</div>
			<div className='row justify-content-center'>
				<div className='col-4'>
					<h5>
						<i className='bi bi-hourglass'></i> Regularizadas: {regularizadas.length}
					</h5>
					<h5>
						<i className='bi bi-check-lg'></i> Aprobadas: {aprobadas.length}
					</h5>
					<h5>
						<i className='bi bi-journals'></i> Total Cursadas: {regularizadasYAprobadas.size}
					</h5>
					<h5>
						<i className='bi bi-arrow-left-right'></i> A cursar: {asignaturas.filter((a) => a.tipo == "Obligatoria").length + 6 - regularizadasYAprobadas.size}
					</h5>
				</div>
				<div className='col-4'>
					<h5>
						<i className='bi bi-compass'></i> Total Electivas: {asignaturas.filter((a) => a.tipo == "Electiva").length}
					</h5>
					<h5>
						<i className='bi bi-journals'></i> Total Asignaturas: {asignaturas.filter((a) => a.tipo == "Obligatoria").length + 6}
					</h5>
					<h5>
						<i className='bi bi-percent'></i> Porcentaje completado: %
						{((aprobadas.length * 100) / (asignaturas.filter((a) => a.tipo == "Obligatoria").length + 6)).toFixed(2)}
					</h5>
				</div>
				<div className='row mt-2'>
					<h6 className='text-secondary'>
						<i className='bi bi-info-circle-fill'></i> Los totales y porcentajes solo toman en cuenta 6 electivas y asignaturas aprobadas.
					</h6>
				</div>
			</div>
		</div>
	);
}

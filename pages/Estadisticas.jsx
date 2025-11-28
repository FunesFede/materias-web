import React, { useContext } from "react";

import Totales from "../components/estadisticas/Totales.jsx";
import AsignaturasContext from "../utils/contexts/AsignaturasContext.js";
import Promedio from "../components/estadisticas/Promedio.jsx";
import Container from "react-bootstrap/Container";

export default function Estadisticas() {
	const asignaturas = useContext(AsignaturasContext);

	let regularizadas = asignaturas ? asignaturas.regularizadas : [];
	let aprobadas = asignaturas ? asignaturas.aprobadas : [];

	const regularizadasYAprobadas = new Set([...regularizadas, ...aprobadas]);

	return (
		<>
			<Container fluid className='py-4 bg-dark text-white d-flex flex-column flex-grow-1'>
				<h3 className='text-start mx-4 mb-3'>
					<i className='bi bi-clipboard-data-fill'></i> Tus Estadísticas
				</h3>
				<Totales aprobadas={aprobadas} regularizadas={regularizadas} regularizadasYAprobadas={regularizadasYAprobadas} />
				<Promedio />
			</Container>
		</>
	);
}

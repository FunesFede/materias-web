import React, { useContext } from "react";

import EstadisticasC from "../components/estadisticas/EstadisticasC.jsx";
import AsignaturasContext from "../utils/contexts/AsignaturasContext.js";
import Promedio from "../components/estadisticas/Promedio.jsx";
import GraficoAvance from "../components/estadisticas/GraficoAvance.jsx";

export default function Estadisticas() {
	const asignaturas = useContext(AsignaturasContext);

	// const [refreshKey, setRefreshKey] = useState(0);
	let regularizadas = asignaturas ? asignaturas.regularizadas : [];
	let aprobadas = asignaturas ? asignaturas.aprobadas : [];

	const regularizadasYAprobadas = new Set([...regularizadas, ...aprobadas]);

	return (
		<>
			<div className='container-fluid p-5 bg-dark text-white d-flex flex-column flex-grow-1'>
				<EstadisticasC aprobadas={aprobadas} regularizadas={regularizadas} regularizadasYAprobadas={regularizadasYAprobadas} />
				<Promedio />
			</div>
		</>
	);
}

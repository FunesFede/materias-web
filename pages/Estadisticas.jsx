import React, { useContext } from "react";

import EstadisticasC from "../components/estadisticas/EstadisticasC.jsx";
import AsignaturasContext from "../utils/contexts/AsignaturasContext.js";
import Promedio from "../components/estadisticas/Promedio.jsx";
import { NavLink } from "react-router";

export default function Estadisticas() {
	const asignaturas = useContext(AsignaturasContext);

	// const [refreshKey, setRefreshKey] = useState(0);
	let regularizadas = asignaturas ? asignaturas.regularizadas : [];
	let aprobadas = asignaturas ? asignaturas.aprobadas : [];

	const regularizadasYAprobadas = new Set([...regularizadas, ...aprobadas]);

	return (
		<>
			<div className='container-fluid p-5 vh-100 bg-dark text-white'>
				<EstadisticasC aprobadas={aprobadas} regularizadas={regularizadas} regularizadasYAprobadas={regularizadasYAprobadas} />
				<Promedio />
			</div>
		</>
	);
}

import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import EstadisticasC from "../components/EstadisticasC.jsx";
import AsignaturasContext from "../utils/contexts/AsignaturasContext.js";

export default function Estadisticas() {
	const navigate = useNavigate();
	const asignaturas = useContext(AsignaturasContext);

	// const [refreshKey, setRefreshKey] = useState(0);
	let regularizadas = asignaturas.regularizadas;
	let aprobadas = asignaturas.aprobadas;

	const regularizadasYAprobadas = new Set([...regularizadas, ...aprobadas]);

	return (
		<>
			<div className='container-fluid py-3 min-vh-100 bg-dark text-white'>
				<EstadisticasC aprobadas={aprobadas} regularizadas={regularizadas} regularizadasYAprobadas={regularizadasYAprobadas} />
			</div>
		</>
	);
}

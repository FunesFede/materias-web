import React from "react";
import { useNavigate, useParams } from "react-router";
import EstadisticasC from "../components/EstadisticasC.jsx";

export default function Estadisticas() {
	const navigate = useNavigate();

	// const [refreshKey, setRefreshKey] = useState(0);
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
		<>
			<EstadisticasC aprobadas={aprobadas} regularizadas={regularizadas} regularizadasYAprobadas={regularizadasYAprobadas} />
		</>
	);
}

// En: components/estadisticas/GraficoAvance.jsx

import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";

import AsignaturasContext from "../../utils/contexts/AsignaturasContext.js";
import asignaturasData from "../../data/asignaturas.json";

Chart.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);
Chart.defaults.color = "#fff";
Chart.defaults.plugins.legend.position = "bottom";

export default function GraficoAvance() {
	const asignaturas = useContext(AsignaturasContext);

	if (!asignaturas) {
		return null;
	}

	const totalObligatorias = asignaturasData.filter((a) => a.tipo == "Obligatoria").length;
	const totalAsignaturas = totalObligatorias + 7; // Total de la carrera

	const aprobadasCount = asignaturas.aprobadas.length;

	const regularizadasYAprobadas = new Set([...asignaturas.regularizadas, ...asignaturas.aprobadas]);
	const cursadasCount = regularizadasYAprobadas.size;

	const regularizadasSoloCount = asignaturas.regularizadas.length;

	const pendientesCount = totalAsignaturas - cursadasCount;

	const data = {
		labels: ["Aprobadas", "Regularizadas", "A Cursar"],
		datasets: [
			{
				label: "Cantidad",
				data: [aprobadasCount, regularizadasSoloCount, pendientesCount],
				backgroundColor: ["rgba(25, 135, 84, 0.7)", "rgba(255, 193, 7, 0.7)", "rgba(108, 117, 125, 0.7)"],
				borderColor: ["rgba(25, 135, 84, 1)", "rgba(255, 193, 7, 1)", "rgba(108, 117, 125, 1)"],
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			title: {
				display: true,
				text: "Progreso",
				font: {
					size: 18,
				},
			},
			legend: {
				position: "bottom",
			},
			datalabels: {
				color: "#fff",
				font: {
					// weight: "bold",
					size: 14,
				},
			},
		},
	};

	return (
		<div className='container-rounded-dark p-3 text-white max-width-80 position-relative mx-auto' style={{ height: "510px" }}>
			<Doughnut data={data} options={options} />

			<div
				className='position-absolute top-50 start-50 translate-middle text-center'
				style={{ pointerEvents: "none" }} // Esto evita que bloquee el mouse
			>
				<h5 className='mb-0 text-secondary'>Total</h5>
				<h2 className='mb-0 fw-bold'>{totalAsignaturas}</h2>
			</div>
		</div>
	);
}

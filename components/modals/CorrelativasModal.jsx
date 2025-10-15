import React from "react";
import { useNavigate } from "react-router";

import asignaturasData from "../../data/asignaturas.json";

export default function CorrelativasModal({ asignatura }) {
	const navigate = useNavigate();
	const regularizadas =
		asignatura.regularizadas.length > 0
			? asignatura.regularizadas.map((acron) => {
					return asignaturasData.find((a) => a.acronimo == acron).nombre;
			  })
			: ["No requiere asignaturas regularizadas."];
	const aprobadas =
		asignatura.aprobadas.length > 0
			? asignatura.aprobadas.map((acron) => {
					return asignaturasData.find((a) => a.acronimo == acron).nombre;
			  })
			: ["No requiere asignaturas aprobadas."];

	return (
		<div className='modal fade' id={asignatura.acronimo + "modal"} key={asignatura.acronimo + "modal"} tabIndex='-1' aria-labelledby='correlativasModalLabel'>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h1 className='modal-title fs-5' id='correlativasModalTitle'>
							<i className='bi bi-arrow-left-right'></i> Correlativas de {asignatura.nombre}
						</h1>
						<button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
					</div>
					<div className='modal-body'>
						<p>
							<span className='fw-bold'>Regularizadas (o aprobadas): </span>
							{regularizadas.join(", ")}
						</p>
						<p>
							<span className='fw-bold'>Aprobadas: </span>
							{aprobadas.join(", ")}
						</p>
					</div>
					<div className='modal-footer'>
						<button className='btn btn-primary' data-bs-dismiss='modal' onClick={() => navigate("/asignatura/" + asignatura.acronimo)}>
							<i className='bi bi-arrow-right'></i> Más Información
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

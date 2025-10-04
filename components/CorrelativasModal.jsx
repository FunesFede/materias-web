import React from "react";
import { useNavigate } from "react-router";

export default function CorrelativasModal({ asignatura }) {
	const navigate = useNavigate();
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
							{asignatura.regularizadas.length > 0 ? asignatura.regularizadas.join(", ") : "No requiere asignaturas regularizadas."}
						</p>
						<p>
							<span className='fw-bold'>Aprobadas: </span>
							{asignatura.aprobadas.length > 0 ? asignatura.aprobadas.join(", ") : "No requiere asignaturas aprobadas."}
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

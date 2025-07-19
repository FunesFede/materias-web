import React from "react";

export default function InfoBanner() {
	return (
		<div className='container-fluid bg-dark2 rounded my-4 py-2 text-white'>
			<div className='row'>
				<div className='col'>
					<h4>Guía de Botones</h4>
					<div className='text-warning'>
						<i className='bi bi-hourglass text-warning'></i> Regularizar Asignatura (cursada pero final no rendido)
					</div>
					<div className='text-success'>
						<i className='bi bi-check-lg'></i> Aprobar Asignatura (final rendido o aprobación directa)
					</div>
					<div className='text-primary'>
						<i className='bi bi-info'></i> Ver Información Detallada
					</div>
					<div className='text-primary'>
						<i className='bi bi-arrow-left-right'></i> Ver Correlativas
					</div>
					<div className='text-danger'>
						<i className='bi bi-x-lg'></i> Eliminar Asignatura (correlativas se caen)
					</div>
				</div>
				<div className='col'>
					<h4>Guía de Íconos</h4>
					<div className='text-danger'>
						<i className='bi bi-lock-fill'></i> Materia No Cursable
					</div>
					<div className='text-white'>
						<i className='bi bi-unlock-fill'></i> Materia Cursable
					</div>
					<div className='text-warning'>
						<i className='bi bi-hourglass'></i> Materia Regularizada
					</div>
					<div className='text-success'>
						<i className='bi bi-check-lg'></i> Materia Aprobada
					</div>
				</div>
			</div>
		</div>
	);
}

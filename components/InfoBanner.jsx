import React from "react";

export default function InfoBanner() {
	return (
		<div className='container-fluid bg-dark2 rounded my-4 text-white'>
			<div className='row'>
				<div className='col'>
					<h4>Botones</h4>
					<div className='text-warning'>
						<i className='bi bi-check-lg text-warning'></i> Regularizar Materia (cursada pero final no rendido)
					</div>
					<div className='text-success'>
						<i className='bi bi-check-all'></i> Aprobar Materia (final rendido o aprobación directa)
					</div>
					<div className='text-primary'>
						<i className='bi bi-info'></i> Ver Información Detallada
					</div>
					<div className='text-primary'>
						<i className='bi bi-arrow-left-right'></i> Ver Correlatividades
					</div>
					<div className='text-danger'>
						<i className='bi bi-x-lg'></i> Eliminar Materia (correlatividades se caen)
					</div>
				</div>
				<div className='col'>
					<h4>Íconos</h4>
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

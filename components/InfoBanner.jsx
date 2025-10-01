export default function InfoBanner() {
	return (
		<>
			<div className='row'>
				<h5 className='col'>Guía de Botones</h5>
			</div>
			<div className='row mb-2'>
				<div className='text-warning col'>
					<i className='bi bi-hourglass text-warning'></i> Regularizar Asignatura <br /> (cursada pero final no rendido)
				</div>
				<div className='text-success col'>
					<i className='bi bi-check-lg'></i> Aprobar Asignatura <br /> (final rendido o AD)
				</div>
				<div className='text-primary col'>
					<i className='bi bi-info-square'></i> Ver Información Detallada
				</div>
				<div className='text-primary col'>
					<i className='bi bi-arrow-left-right'></i> Ver Correlativas
				</div>
				<div className='text-danger col'>
					<i className='bi bi-x-lg'></i> Eliminar Asignatura (correlativas se caen)
				</div>
			</div>
			<div className='row'>
				<div className='col'>
					<h5>Guia de Iconos</h5>
				</div>
			</div>
			<div className='row mb-3'>
				<div className='text-danger col'>
					<i className='bi bi-lock-fill'></i> Asignatura No Cursable
				</div>
				<div className='text-white col'>
					<i className='bi bi-unlock-fill'></i> Asignatura Cursable
				</div>
				<div className='text-warning col'>
					<i className='bi bi-hourglass'></i> Asignatura Regularizada
				</div>
				<div className='text-success col'>
					<i className='bi bi-check-lg'></i> Asignatura Aprobada
				</div>
				<div className='col'></div>
			</div>
		</>
	);
}

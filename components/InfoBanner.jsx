export default function InfoBanner() {
	return (
		<>
			<div className='row'>
				<h5 className='col'>Guía de Botones</h5>
			</div>
			<div className='row mb-2'>
				<div className='text-success'>
					<i className='bi bi-check-lg'></i> Aprobar Asignatura <br /> (final rendido o AD)
				</div>
				<div className='text-warning mt-2'>
					<i className='bi bi-hourglass text-warning'></i> Regularizar Asignatura <br /> (cursada pero final no rendido)
				</div>
				<div className='text-primary mt-2'>
					<i className='bi bi-info-circle'></i> Ver Información Detallada
				</div>
				<div className='text-primary mt-2'>
					<i className='bi bi-arrow-left-right'></i> Ver Correlativas
				</div>
				<div className='text-danger mt-2'>
					<i className='bi bi-x-lg'></i> Eliminar Asignatura (dependientes se caen)
				</div>
			</div>
			<div className='row'>
				<div className='col'>
					<br />
				</div>
			</div>
			<div className='row'>
				<div className='col'>
					<h5>Guía de Iconos</h5>
				</div>
			</div>
			<div className='row mb-3'>
				<div className='text-white'>
					<i className='bi bi-unlock-fill'></i> Asignatura Cursable
				</div>
				<div className='text-danger mt-2'>
					<i className='bi bi-lock-fill'></i> Asignatura No Cursable
				</div>
				<div className='text-success mt-2'>
					<i className='bi bi-check-lg'></i> Asignatura Aprobada
				</div>
				<div className='text-warning mt-2'>
					<i className='bi bi-hourglass'></i> Asignatura Regularizada
				</div>
			</div>
		</>
	);
}

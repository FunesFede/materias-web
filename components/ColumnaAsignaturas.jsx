import React from "react";

export default function ColumnaAsignaturas({ titulo, asignaturas }) {
	return (
		<div className='columna-asignaturas'>
			<h3 className='titulo-columna'>{titulo}</h3>
			<div className='lista-asignaturas'>
				{asignaturas.map((asignatura, index) => (
					<AsignaturaItem key={index} asignatura={asignatura} />
				))}
			</div>
		</div>
	);
}

function AsignaturaItem({ asignatura }) {
	return (
		<div className='asignatura-item mb-3'>
			<div className='card h-100'>
				<div className='card-body d-flex flex-column'>
					<h6 className='card-title text-center'>{asignatura.nombre}</h6>
					<div className='mt-auto d-flex justify-content-center gap-2'>
						<button className='btn btn-primary btn-sm'>C</button>
						<button className='btn btn-secondary btn-sm'>A</button>
					</div>
				</div>
			</div>
		</div>
	);
}

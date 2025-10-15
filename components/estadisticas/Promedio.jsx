import React, { useContext, useEffect, useState } from "react";

import AsignaturasContext from "../../utils/contexts/AsignaturasContext";
import NotasContext from "../../utils/contexts/NotasContext";

export default function Promedio() {
	const asignaturas = useContext(AsignaturasContext);
	const notas = useContext(NotasContext);

	const promedio = Object.values(notas).length > 0 ? Object.values(notas).reduce((acc, nota) => acc + nota, 0) / Object.values(notas).length : 0;

	return (
		<div className='container-fluid container-rounded-dark rounded my-4 py-3 text-white max-width-80'>
			<div className='row mb-3'>
				<h4>
					<i className='bi bi-stickies-fill'></i> Tu Promedio
				</h4>
			</div>
			<div className='row justify-content-center'>
				<div className='col-4'>
					<h5>
						<i className='bi bi-folder'></i> Promedio sin aplazos: {promedio.toFixed(2)}
					</h5>
				</div>
				<div className='col-4'>
					<h5>
						<i className='bi bi-folder-x'></i> Promedio con aplazos:{" "}
						<a
							className='link-body-emphasis link-offset-2 link-underline link-underline-opacity-0'
							href='https://www.youtube.com/watch?v=FpU1B-c5frQ'
							target='_blank'
							rel='noopener noreferrer'
						>
							No disponible
						</a>
					</h5>
				</div>
			</div>
			{asignaturas.aprobadas.length != Object.values(notas).length ? (
				<div className='alert alert-warning my-2' role='alert'>
					<i className='bi bi-exclamation-triangle-fill'></i> La cantidad de notas no es igual a la cantidad de aprobadas registradas. Es posible que tengas asignaturas
					aprobadas sin una nota final registrada. <span className='fw-bold'>Esto afecta el cálculo de tu promedio</span>.
				</div>
			) : (
				""
			)}
		</div>
	);
}

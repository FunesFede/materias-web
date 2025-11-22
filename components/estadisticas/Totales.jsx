import React, { useEffect, useState } from "react";
import asignaturas from "../../data/asignaturas.json";

import GraficoAvance from "./GraficoAvance";

export default function EstadisticasC({ regularizadas, aprobadas, regularizadasYAprobadas }) {
	return (
		<div className='container-fluid text-white max-width-80'>
			<div className='alert alert-info alert-dismissible' role='alert'>
				<div className='text-start'>
					<i className='bi bi-info-circle-fill'></i> Los totales y porcentajes solo toman en cuenta 7 electivas.
				</div>
				<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
			</div>

			<div className='row g-3 p-2'>
				<div className='col-md-8'>
					<GraficoAvance />
				</div>

				<div className='col-md-4 d-flex flex-column gap-3'>
					<div className='card bg-info text-white'>
						<div className='card-body text-center'>
							<i className='bi bi-percent fs-1'></i>
							<h3 className='mt-2 mb-0'>%{((aprobadas.length * 100) / (asignaturas.filter((a) => a.tipo == "Obligatoria").length + 7)).toFixed(2)}</h3>
							<p className='mb-0'>Completado</p>
						</div>
					</div>

					<div className='card bg-secondary text-white'>
						<div className='card-body text-center'>
							<i className='bi bi-archive fs-1'></i>
							<h3 className='mt-2 mb-0'>{regularizadasYAprobadas.size}</h3>
							<p className='mb-0'>Total Cursadas</p>
						</div>
					</div>

					<div className='card bg-warning text-white'>
						<div className='card-body text-center'>
							<i className='bi bi-hourglass-split fs-1'></i>
							<h3 className='mt-2 mb-0'>{regularizadas.length}</h3>
							<p className='mb-0'>Asignaturas Regularizadas</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

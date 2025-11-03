import React, { useEffect, useState } from "react";
import asignaturas from "../../data/asignaturas.json";

import GraficoAvance from "./GraficoAvance";

export default function EstadisticasC({ regularizadas, aprobadas, regularizadasYAprobadas }) {
	return (
		<div className='container-fluid py-3 container-rounded-dark rounded text-white max-width-80'>
			<div className='row mb-3'>
				<h4>
					<i className='bi bi-graph-up'></i> Tus Estadísticas
				</h4>
			</div>
			<div className='row justify-content-center'>
				<div className='col-4'>
					<h5>
						<i className='bi bi-journals'></i> Total Cursadas: {regularizadasYAprobadas.size}
					</h5>
				</div>
				<div className='col-4'>
					<h5>
						<i className='bi bi-percent'></i> Completado: %{((aprobadas.length * 100) / (asignaturas.filter((a) => a.tipo == "Obligatoria").length + 7)).toFixed(2)}
					</h5>
				</div>
				<div className='row justify-content-center'>
					<GraficoAvance />
				</div>
				<div className='row mt-2'>
					<h6 className='text-secondary'>
						<i className='bi bi-info-circle-fill'></i> Los porcentajes y totales solo toman en cuenta asignaturas aprobadas y 7 de las{" "}
						{asignaturas.filter((a) => a.tipo == "Electiva").length} electivas.
					</h6>
					<h6 className='text-secondary'>Seguramente te está yendo mejor que el Augusto</h6>
				</div>
			</div>
		</div>
	);
}

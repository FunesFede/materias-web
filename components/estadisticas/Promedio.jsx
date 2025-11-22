import React, { useContext, useEffect, useState } from "react";

import AsignaturasContext from "../../utils/contexts/AsignaturasContext";
import NotasContext from "../../utils/contexts/NotasContext";
import asignaturasData from "../../data/asignaturas.json";
import { NavLink } from "react-router";

export default function Promedio() {
	const asignaturas = useContext(AsignaturasContext);
	const notas = useContext(NotasContext);
	const [aplazos, setAplazos] = useState(0);

	const notasArray = Object.values(notas);
	const sumaNotas = notasArray.reduce((acc, nota) => acc + nota, 0);
	const cantidadNotas = notasArray.length;

	const promedio = cantidadNotas > 0 ? (sumaNotas / cantidadNotas).toFixed(2) : 0;
	const promAplazos = aplazos != 0 ? ((sumaNotas + aplazos * 2) / (cantidadNotas + aplazos)).toFixed(2) : promedio;

	return (
		<div className='container-fluid'>
			<div className='row g-3 p-2 mb-4'>
				<div className='col-md-4 show-mobile'>
					<div className='card bg-success text-white h-100'>
						<div className='card-body text-center'>
							<i className='bi bi-check-circle fs-1'></i>
							<h3 className='mt-2 mb-0'>{cantidadNotas}</h3>
							<p className='mb-0'>Asignaturas aprobadas</p>
						</div>
					</div>
				</div>

				<div className='col-md-4'>
					<div className='card bg-primary text-white h-100'>
						<div className='card-body text-center'>
							<i className='bi bi-file-earmark-check-fill fs-1'></i>
							<h3 className='mt-2 mb-0'>{promedio}</h3>
							<p className='mb-0'>Promedio sin aplazos</p>
						</div>
					</div>
				</div>

				<div className='col-md-2'>
					<div className='card bg-danger text-white h-100'>
						<div className='card-body text-center'>
							<i className='bi bi-file-earmark-excel-fill fs-1'></i>
							<h3 className='mt-2 mb-0'>{aplazos != 0 ? promAplazos : "A Calcular"}</h3>
							<p className='mb-0'>Promedio con aplazos</p>
						</div>
					</div>
				</div>

				<div className='col-md-2'>
					<div className='card bg-secondary text-white h-100'>
						<div className='card-body text-center'>
							<i className='bi bi-folder-x fs-1'></i>
							<input
								id='inputAplazos'
								defaultValue={0}
								onChange={(e) => setAplazos(Number(e.target.value))}
								className='form-control text-center mt-2 mb-0'
								type='number'
								min={0}
							/>
							<p className='mb-0'>Cantidad Aplazos</p>
						</div>
					</div>
				</div>

				<div className='col-md-4 hide-mobile'>
					<div className='card bg-success text-white h-100'>
						<div className='card-body text-center'>
							<i className='bi bi-check-circle fs-1'></i>
							<h3 className='mt-2 mb-0'>{cantidadNotas}</h3>
							<p className='mb-0'>Asignaturas aprobadas</p>
						</div>
					</div>
				</div>
			</div>

			<div className='container-rounded-dark rounded p-3'>
				<h5 className='text-white mb-3'>
					<i className='bi bi-list-check'></i> Detalle de Notas
				</h5>
				<div className='table-responsive'>
					<table className='table table-striped'>
						<thead>
							<tr>
								<th scope='col'>Asignatura</th>
								<th scope='col'>Nota Final</th>
								<th scrope='col'>Editar</th>
							</tr>
						</thead>
						<tbody className='table-group-divider'>
							{Object.entries(notas).map(([acrom, nota]) => {
								const asig = asignaturasData.find((a) => a.acronimo === acrom);
								return (
									<tr key={acrom}>
										<td>{asig?.nombre || acrom} </td>
										<td>
											<span className={`badge ${nota >= 8 ? "bg-success" : nota >= 6 ? "bg-warning" : "bg-danger"}`}>{nota}</span>
										</td>
										<td>
											<NavLink to={`/asignaturas/${acrom}?edit=true`}>
												<i className='bi bi-pen'></i>
											</NavLink>
										</td>
									</tr>
								);
							})}
						</tbody>
						<tfoot className='rounded'>
							<tr className='fw-semibold'>
								<td>Cantidad: {cantidadNotas}</td>
								<td>Suma: {sumaNotas}</td>
								<td></td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>

			{/* Alert */}
			{asignaturas?.aprobadas.length != Object.values(notas).length && (
				<div className='alert alert-warning mt-3' role='alert'>
					<i className='bi bi-exclamation-triangle-fill'></i> La cantidad de notas no es igual a la cantidad de aprobadas registradas.
					<span className='fw-bold'> Esto afecta el cálculo de tu promedio</span>.
				</div>
			)}
		</div>
	);
}

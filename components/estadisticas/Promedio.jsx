import React, { useContext, useEffect, useState } from "react";

import AsignaturasContext from "../../utils/contexts/AsignaturasContext";
import NotasContext from "../../utils/contexts/NotasContext";
import asignaturasData from "../../data/asignaturas.json";
import { NavLink } from "react-router";

export default function Promedio() {
	const asignaturas = useContext(AsignaturasContext);
	const notas = useContext(NotasContext);
	const [aplazos, setAplazos] = useState(0);

	const faltantes = (asignaturas.aprobadas || []).filter((acrom) => !(acrom in notas));

	const notasArray = Object.values(notas);
	const sumaNotas = notasArray.reduce((acc, nota) => acc + nota, 0);
	const cantidadNotas = notasArray.length;

	const promedio = cantidadNotas > 0 ? (sumaNotas / cantidadNotas).toFixed(2) : 0;
	const promAplazos = aplazos != 0 ? ((sumaNotas + aplazos * 2) / (cantidadNotas + aplazos)).toFixed(2) : promedio;

	const notasDetalle = Object.entries(notas)
		.map(([acrom, nota]) => {
			const nombre = asignaturasData.find((a) => a.acronimo === acrom)?.nombre || acrom;
			return { acrom, nombre, nota };
		})
		.sort((a, b) => a.nombre.localeCompare(b.nombre));

	console.log(notasDetalle);

	return (
		<div className='container-fluid'>
			<div className='row g-3 p-2 mb-4 user-select-none'>
				<div className='col-md-4 show-mobile'>
					<div className='card bg-success bg-gradient text-white h-100'>
						<div className='card-body text-center'>
							<i className='bi bi-check-circle fs-1'></i>
							<h3 className='mt-2 mb-0'>{cantidadNotas}</h3>
							<p className='mb-0'>Asignaturas aprobadas</p>
						</div>
					</div>
				</div>

				<div className='col-md-4'>
					<div className='card bg-primary bg-gradient text-white h-100'>
						<div className='card-body text-center'>
							<i className='bi bi-file-earmark-check-fill fs-1'></i>
							<h3 className='mt-2 mb-0'>{promedio}</h3>
							<p className='mb-0'>Promedio sin aplazos</p>
						</div>
					</div>
				</div>

				<div className='col-md-2'>
					<div className='card bg-danger bg-gradient text-white h-100'>
						<div className='card-body text-center'>
							<i className='bi bi-file-earmark-excel-fill fs-1'></i>
							<h3 className='mt-2 mb-0'>{aplazos != 0 ? promAplazos : "A Calcular"}</h3>
							<p className='mb-0'>Promedio con aplazos</p>
						</div>
					</div>
				</div>

				<div className='col-md-2'>
					<div className='card bg-secondary bg-gradient text-white h-100'>
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
					<div className='card bg-success bg-gradient text-white h-100'>
						<div className='card-body text-center'>
							<i className='bi bi-check-circle fs-1'></i>
							<h3 className='mt-2 mb-0'>{cantidadNotas}</h3>
							<p className='mb-0'>Asignaturas aprobadas</p>
						</div>
					</div>
				</div>
			</div>

			{asignaturas?.aprobadas.length != Object.values(notas).length && (
				<div className='alert alert-danger mt-3' role='alert'>
					<i className='bi bi-exclamation-triangle-fill'></i> La cantidad de notas no es igual a la cantidad de aprobadas registradas.
					<span className='fw-bold'> Esto afecta el cálculo de tu promedio</span>.
				</div>
			)}

			<div className='container-rounded-dark rounded p-3'>
				<div
					className='d-flex justify-content-between align-items-center clickable'
					data-bs-toggle='collapse'
					href='#tableCollapse'
					role='button'
					aria-expanded='false'
					aria-controls='tableCollapse'
				>
					<h5 className='text-white mb-0'>
						<i className='bi bi-list-check'></i> Detalle de Notas
					</h5>
					<button className='btn btn-link text-white text-decoration-none'>
						<i className='bi bi-chevron-down'></i>
					</button>
				</div>

				<div className='collapse' id='tableCollapse'>
					<hr className='text-white' />
					<div className='table-responsive'>
						<table className='table table-dark table-striped'>
							<thead>
								<tr>
									<th scope='col'>
										<i className='bi bi-sort-alpha-down'></i> Asignatura
									</th>
									<th scope='col'>Nota Final</th>
									<th scope='col'></th>
								</tr>
							</thead>
							<tbody className='table-group-divider'>
								{faltantes.length > 0 &&
									faltantes.map((faltante, index) => {
										const nombre = asignaturasData.find((a) => a.acronimo === faltante)?.nombre;
										return (
											<tr key={index} className='table-danger'>
												<td>{nombre} </td>
												<td>
													<span className='badge bg-danger'>
														<i className='bi bi-exclamation-triangle-fill'></i>
													</span>
												</td>
												<td>
													<NavLink to={`/asignaturas/${faltante}?edit=true`}>
														<i className='bi bi-pen'></i>
													</NavLink>
												</td>
											</tr>
										);
									})}

								{notasDetalle.map((asig, index) => {
									return (
										<tr key={index}>
											<td>{asig.nombre} </td>
											<td>
												<span className={`badge ${asig.nota >= 8 ? "bg-success" : asig.nota >= 6 ? "bg-warning" : "bg-danger"}`}>{asig.nota}</span>
											</td>
											<td>
												<NavLink to={`/asignaturas/${asig.acrom}?edit=true`}>
													<i className='bi bi-pen'></i>
												</NavLink>
											</td>
										</tr>
									);
								})}
							</tbody>
							<tfoot>
								<tr className='fw-semibold'>
									<td>Cantidad: {cantidadNotas}</td>
									<td>Suma: {sumaNotas}</td>
									<td></td>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";

import asignaturasData from "../data/asignaturas.json";
import asigUtils from "../utils/asignaturas.js";
import AsignaturasContext from "../utils/contexts/AsignaturasContext.js";

export default function AsignaturaInfo() {
	const { acrom } = useParams();
	const navigate = useNavigate();
	const asignaturas = useContext(AsignaturasContext);

	let asignatura = asignaturasData.filter((asign) => asign.acronimo == acrom.toUpperCase())[0];
	if (!asignatura) {
		asignatura = {
			nombre: "Asignatura No Encontrada",
			tipo: "?",
			duracion: "?",
			aprobadas: ["?"],
			regularizadas: ["?"],
		};
	}

	const asignRegularizadas = asignaturasData.filter((asign) => asignatura.regularizadas.includes(asign.acronimo));
	const asignAprobadas = asignaturasData.filter((asign) => asignatura.aprobadas.includes(asign.acronimo));
	const correlativaFuturaRegular = asignaturasData.filter((asign) => asign.regularizadas.includes(asignatura.acronimo));
	const correlativaFuturaAprobada = asignaturasData.filter((asign) => asign.aprobadas.includes(asignatura.acronimo));
	const correlativaFutura = [...correlativaFuturaAprobada, ...correlativaFuturaRegular].sort((a, b) => a.nombre.localeCompare(b.nombre));

	const esHecha = (a) => {
		return asignaturas.regularizadas.includes(a) || asignaturas.aprobadas.includes(a);
	};

	const esCursable = (a) => {
		for (let index = 0; index < a.regularizadas.length; index++) {
			const element = a.regularizadas[index];
			if (!asignaturas.regularizadas.includes(element) && !asignaturas.aprobadas.includes(element)) return false;
		}

		for (let index = 0; index < a.aprobadas.length; index++) {
			const element = a.aprobadas[index];
			if (!asignaturas.aprobadas.includes(element)) return false;
		}

		return true;
	};

	const handleEstado = () => {
		if (esCursable(asignatura)) {
			if (esHecha(asignatura.acronimo)) {
				if (asignaturas.aprobadas.includes(asignatura.acronimo))
					return (
						<span className='text-success'>
							<i className='bi bi-check-lg'></i> Aprobada
						</span>
					);
				else
					return (
						<span className='text-warning'>
							<i className='bi bi-hourglass'></i> Regularizada
						</span>
					);
			} else
				return (
					<span>
						<i className='bi bi-unlock-fill'></i> Cursable
					</span>
				);
		} else
			return (
				<span className='text-danger'>
					<i className='bi bi-lock-fill'></i> No Cursable
				</span>
			);
	};

	const handleColor = (asig) => {
		if (esCursable(asig)) {
			if (esHecha(asig.acronimo)) {
				if (asignaturas.aprobadas.includes(asig.acronimo)) return "text-success";
				else return "text-warning";
			} else return "";
		} else return "text-danger";
	};

	const handleAnio = () => {
		switch (asignatura.anio) {
			case 1:
				return "Primero";
			case 2:
				return "Segundo";
			case 3:
				return "Tercero";
			case 4:
				return "Cuarto";
			case 5:
				return "Quinto";
			default:
				return asignatura.anio;
		}
	};

	return (
		<>
			<div className='container-fluid min-vh-100 bg-dark text-white d-flex align-items-center justify-content-center w-responsive'>
				<div className='container'>
					<div className='card bg-dark-custom text-white'>
						<div className='card-body container-dark-rounded rounded'>
							<div className='card-title mb-0 pb-0'>
								<h2>{asignatura.nombre}</h2>
								<p className='card-subtitle mb-2'>
									<span className='fw-bold'>Año: </span> {handleAnio()},<span className='fw-bold'> Tipo: </span>
									{asignatura.tipo},<span className='fw-bold'> Duración: </span>
									{asignatura.duracion},<span className='fw-bold'> Acrónimo: </span>
									{asignatura.acronimo}
								</p>
							</div>
							<div className='card-text pt-0'>
								<ul className='list-group list-group-flush pt-0'>
									<li key='1' className='list-group-item pt-0 bg-dark-custom text-white'>
										<span className='fw-bold'>Estado:</span> {handleEstado()}
									</li>
									<li key='2' className='list-group-item bg-dark-custom text-white'>
										<div className='fw-bold'>
											<span>
												<i className='bi bi-arrow-left-right'></i> Correlativas
											</span>
										</div>
										<div>
											<span className='fw-semibold'>Regularizadas:</span>{" "}
											{asignatura.regularizadas.length > 0
												? asignRegularizadas.map((a, idx) => (
														<React.Fragment key={a.acronimo}>
															<span className={handleColor(a)}>{a.nombre}</span>
															{idx < asignRegularizadas.length - 1 ? ", " : ""}
														</React.Fragment>
												  ))
												: "No requiere asignaturas regularizadas"}
										</div>
										<div>
											<span className='fw-semibold'>Aprobadas:</span>{" "}
											{asignatura.aprobadas.length > 0
												? asignAprobadas.map((a, idx) => (
														<React.Fragment key={a.acronimo}>
															<span className={handleColor(a)}>{a.nombre}</span>
															{idx < asignAprobadas.length - 1 ? ", " : ""}
														</React.Fragment>
												  ))
												: "No requiere asignaturas aprobadas"}
										</div>
									</li>
									<li key='4' className='list-group-item bg-dark-custom text-white'>
										<div className='fw-bold'>
											<span>
												<i className='bi bi-link-45deg'></i> Dependiente En
											</span>
										</div>
										<div>
											<span className='fw-semibold'>Como regularizada:</span>{" "}
											{correlativaFuturaRegular.length > 0
												? correlativaFuturaRegular.map((a, idx) => (
														<React.Fragment key={a.acronimo}>
															<span className={handleColor(a)}>{a.nombre}</span>
															{idx < correlativaFuturaRegular.length - 1 ? ", " : ""}
														</React.Fragment>
												  ))
												: "No es dependiente como regular"}
										</div>
										<div>
											<span className='fw-semibold'>Como aprobada:</span>{" "}
											{correlativaFuturaAprobada.length > 0
												? correlativaFuturaAprobada.map((a, idx) => (
														<React.Fragment key={a.acronimo}>
															<span className={handleColor(a)}>{a.nombre}</span>
															{idx < correlativaFuturaAprobada.length - 1 ? ", " : ""}
														</React.Fragment>
												  ))
												: "No es dependiente como aprobada"}
										</div>
									</li>
									<br />
								</ul>
							</div>
							<div className='card-text'>
								<div className='row'>
									<div className='col-md-6 mb-2 mb-md-0'>
										<select
											name=''
											id=''
											className='form-select'
											onChange={(e) => (e.target.value != "-1" ? navigate(`/asignatura/${e.target.value}`) : "")}
											disabled={asignAprobadas.length == 0 && asignRegularizadas.length == 0}
											defaultValue='-1'
										>
											<option value='-1'>Visitar Correlativa</option>
											{asignRegularizadas.map((asign, index) => (
												<option key={index} value={asign.acronimo}>
													{asign.nombre}
												</option>
											))}
											{asignAprobadas.map((asign, index) => (
												<option key={index * 5} value={asign.acronimo}>
													{asign.nombre}
												</option>
											))}
										</select>
									</div>
									<div className='col-md-6'>
										<select
											name=''
											id=''
											className='form-select'
											onChange={(e) => (e.target.value != "-1" ? navigate(`/asignatura/${e.target.value}`) : "")}
											disabled={correlativaFutura.length == 0}
											defaultValue='-1'
										>
											<option value='-1'>Visitar Dependiente</option>
											{correlativaFutura.map((asign, index) => (
												<option key={index} value={asign.acronimo}>
													{asign.nombre}
												</option>
											))}
										</select>
									</div>
								</div>
								<button className='btn btn-primary me-3 mt-3' onClick={() => navigate(-1)}>
									<i className='bi bi-arrow-left'></i> Volver
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

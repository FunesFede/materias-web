import React from "react";
import { useNavigate, useParams } from "react-router";

import asignaturas from "../data/asignaturas.json";
import asigUtils from "../utils/asignaturas.js";

export default function AsignaturaInfo() {
	const { acrom } = useParams();
	const navigate = useNavigate();

	let asignatura = asignaturas.filter((asign) => asign.acronimo == acrom.toUpperCase())[0];
	if (!asignatura) {
		asignatura = {
			nombre: "Asignatura No Encontrada",
			tipo: "?",
			duracion: "?",
			aprobadas: ["?"],
			regularizadas: ["?"],
		};
	}

	const asignRegularizadas = asignaturas.filter((asign) => asignatura.regularizadas.includes(asign.acronimo));
	const asignAprobadas = asignaturas.filter((asign) => asignatura.aprobadas.includes(asign.acronimo));
	const correlativaFuturaRegular = asignaturas.filter((asign) => asign.regularizadas.includes(asignatura.acronimo));
	const correlativaFuturaAprobada = asignaturas.filter((asign) => asign.aprobadas.includes(asignatura.acronimo));
	const correlativaFutura = [...correlativaFuturaAprobada, ...correlativaFuturaRegular].sort((a, b) => a.nombre.localeCompare(b.nombre));

	const esHecha = (a) => {
		return asigUtils.esRegularizada(a) || asigUtils.esAprobada(a);
	};

	const esCursable = (a) => {
		for (let index = 0; index < a.regularizadas.length; index++) {
			const element = a.regularizadas[index];
			if (!asigUtils.esRegularizada(element)) return false;
		}

		for (let index = 0; index < a.aprobadas.length; index++) {
			const element = a.aprobadas[index];
			if (!asigUtils.esAprobada(element)) return false;
		}

		return true;
	};

	const handleEstado = () => {
		if (esCursable(asignatura)) {
			if (esHecha(asignatura.acronimo)) {
				if (asigUtils.esAprobada(asignatura.acronimo))
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
				if (asigUtils.esAprobada(asig.acronimo)) return "text-success";
				else return "text-warning";
			} else return "";
		} else return "text-danger";
	};

	return (
		<div className='container-fluid my-2 min-vh-100 bg-dark text-white'>
			<div className='position-absolute top-50 start-50 translate-middle'>
				<div className='card'>
					<div className='card-body'>
						<h5 className='card-title'>{asignatura.nombre}</h5>
						<p className='card-subtitle mb-2 text-body-secondary'>
							Tipo: {asignatura.tipo}, Duración: {asignatura.duracion}, Acrónimo: {asignatura.acronimo}
						</p>
					</div>
					<ul className='list-group list-group-flush'>
						<li key='1' className='list-group-item'>
							<span className='fw-bold'>Estado:</span> {handleEstado()}
						</li>
						<li key='2' className='list-group-item'>
							<div className='fw-bold'>
								<span>
									<i class='bi bi-arrow-left-right'></i> Correlativas
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
						<li key='4' className='list-group-item'>
							<div className='fw-bold'>
								<span>
									<i class='bi bi-link-45deg'></i> Dependiente En:
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
					</ul>
					<div className='card-body'>
						<select
							name=''
							id=''
							className='form-select'
							onChange={(e) => (e.target.value != "-1" ? navigate(`/materias-web/${e.target.value}`) : "")}
							disabled={asignAprobadas.length == 0 && asignRegularizadas.length == 0}
						>
							<option value='-1' selected>
								Visitar Correlativa
							</option>
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
						<select
							name=''
							id=''
							className='form-select mt-2'
							onChange={(e) => (e.target.value != "-1" ? navigate(`/materias-web/${e.target.value}`) : "")}
							disabled={correlativaFutura.length == 0}
						>
							<option value='-1' selected>
								Visitar Dependiente
							</option>
							{correlativaFutura.map((asign, index) => (
								<option key={index} value={asign.acronimo}>
									{asign.nombre}
								</option>
							))}
						</select>
						<button className='btn btn-primary me-3 mt-3' onClick={() => navigate(-1)}>
							<i className='bi bi-arrow-left'></i> Volver
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

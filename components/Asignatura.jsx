import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";

import AsignaturasContext from "../utils/contexts/AsignaturasContext.js";
import UserStateContext from "../utils/contexts/UserContext.js";

import { addAprobada, addRegularizada, borrarAsignaturaRecursivo } from "../utils/firebase/asignaturas.js";

export default function Asignatura({ asignatura }) {
	const navigate = useNavigate();
	const asignaturas = useContext(AsignaturasContext);
	const user = useContext(UserStateContext);

	const esHecha = () => {
		return asignaturas.regularizadas.includes(asignatura.acronimo) || asignaturas.aprobadas.includes(asignatura.acronimo);
	};

	const esCursable = () => {
		for (let index = 0; index < asignatura.regularizadas.length; index++) {
			const element = asignatura.regularizadas[index];
			if (!asignaturas.regularizadas.includes(element) && !asignaturas.aprobadas.includes(element)) return false;
		}

		for (let index = 0; index < asignatura.aprobadas.length; index++) {
			const element = asignatura.aprobadas[index];
			if (!asignaturas.aprobadas.includes(element)) return false;
		}

		return true;
	};

	const handleIcono = () => {
		if (esCursable()) {
			if (esHecha()) {
				if (asignaturas.aprobadas.includes(asignatura.acronimo)) return <i className='bi bi-check-lg'></i>;
				else return <i className='bi bi-hourglass'></i>;
			} else return <i className='bi bi-unlock-fill'></i>;
		} else return <i className='bi bi-lock-fill'></i>;
	};

	return (
		<div className='asignatura-vertical mb-3'>
			<div
				className={
					esHecha()
						? asignaturas.aprobadas.includes(asignatura.acronimo)
							? "card bg-success-dark text-white"
							: "card bg-warning-dark text-white"
						: esCursable()
						? "card bg-secondary text-white"
						: "card bg-danger-dark text-white"
				}
			>
				<div className='card-body'>
					<h5 className='card-title'>
						{handleIcono()}
						<span className={esHecha() ? "text-decoration-line-through" : ""}>{asignatura.nombre}</span>{" "}
						{asignatura.tipo == "Electiva" && <span className='badge text-bg-success'>Electiva</span>}
					</h5>

					<div className='botones-container'>
						<button
							title='Aprobar Asignatura'
							disabled={!esCursable() || asignaturas.aprobadas.includes(asignatura.acronimo)}
							className='btn btn-success btn-sm me-2 text-white'
							onClick={() => addAprobada(user.uid, asignatura.acronimo)}
						>
							<i className='bi bi-check-lg'></i>
						</button>

						<button
							title='Regularizar Asignatura'
							disabled={!esCursable() || esHecha()}
							className='btn btn-warning btn-sm me-2 text-white'
							onClick={() => addRegularizada(user.uid, asignatura.acronimo)}
						>
							<i className='bi bi-hourglass-bottom'></i>
						</button>

						<button title='Ver Información' className='btn btn-primary btn-sm me-2' onClick={() => navigate(`/asignatura/${asignatura.acronimo}`)}>
							<i className='bi bi-info'></i>
						</button>

						<button title='Ver Correlativas' className='btn btn-primary btn-sm me-2' data-bs-toggle='modal' data-bs-target={"#" + asignatura.acronimo + "modal"}>
							<i className='bi bi-arrow-left-right'></i>
						</button>

						<button
							title='Eliminar Cursado'
							disabled={!esHecha()}
							className='btn btn-danger btn-sm'
							onClick={() => borrarAsignaturaRecursivo(user.uid, asignatura.acronimo)}
						>
							<i className='bi bi-x-lg'></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

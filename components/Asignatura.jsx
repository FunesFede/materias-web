import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Modal } from "bootstrap";

import AsignaturasContext from "../utils/contexts/AsignaturasContext.js";
import UserStateContext from "../utils/contexts/UserContext.js";

import { esCursable, esHecha } from "../utils/asignaturasHelpers.js";

import { addRegularizada, borrarAsignaturaRecursivo } from "../utils/firebase/asignaturas.js";

export default function Asignatura({ asignatura }) {
	const navigate = useNavigate();
	const asignaturas = useContext(AsignaturasContext);
	const user = useContext(UserStateContext);

	const hecha = asignaturas ? esHecha(asignaturas, asignatura) : false;
	const cursable = asignaturas ? esCursable(asignaturas, asignatura) : false;
	const aprobada = asignaturas ? asignaturas.aprobadas.includes(asignatura.acronimo) : false;

	const handleIcono = () => {
		if (cursable) {
			if (hecha) {
				if (asignaturas.aprobadas.includes(asignatura.acronimo)) return <i className='bi bi-check-lg'></i>;
				else return <i className='bi bi-hourglass-split'></i>;
			} else return <i className='bi bi-unlock-fill'></i>;
		} else return <i className='bi bi-lock-fill'></i>;
	};

	const openModal = () => {
		const modalEl = document.getElementById(asignatura.acronimo + "NotaModal");
		const modal = Modal.getOrCreateInstance(modalEl);
		modal.show();

		// Wait before focus because .show() returns before the modal pops up
		setTimeout(() => {
			const input = document.getElementById("notaInput" + asignatura.acronimo);
			console.log(input);
			input.focus({ focusVisible: true });
		}, 500);
	};

	const eliminarAsignatura = () => {
		if (window.confirm("¿Seguro que deseas eliminar esta asignatura?\n\nAsignaturas que dependan de esta serán eliminadas y la nota de exámen final será removida.")) {
			borrarAsignaturaRecursivo(user.uid, asignatura.acronimo);
		}
	};

	return (
		<>
			<div className='asignatura-vertical mb-3 user-select-none'>
				<div
					className={
						hecha
							? asignaturas.aprobadas.includes(asignatura.acronimo)
								? "card bg-success bg-gradient bg-opacity-50 text-white"
								: "card bg-warning bg-gradient bg-opacity-50 text-white"
							: cursable
							? "card bg-secondary bg-gradient bg-opacity-75 text-white"
							: "card bg-danger bg-gradient bg-opacity-75 text-white"
					}
				>
					<div className='card-body'>
						<h5 className='card-title'>
							{handleIcono()}
							<span className={aprobada ? "text-decoration-line-through" : ""}>{asignatura.nombre}</span>{" "}
							{asignatura.tipo == "Electiva" && <span className='badge text-bg-success bg-gradient bg-opacity-75'>Electiva</span>}
						</h5>

						<div className='botones-container'>
							<button
								title='Aprobar Asignatura'
								disabled={!cursable || asignaturas.aprobadas.includes(asignatura.acronimo)}
								className='btn btn-success btn-sm shadow me-2 text-white'
								id={asignatura.acronimo + "btnNotaModal"}
								onClick={openModal}
							>
								<i className='bi bi-check-lg'></i>
							</button>

							<button
								title='Regularizar Asignatura'
								disabled={!cursable || hecha}
								className='btn btn-warning btn-sm me-2 shadow text-white'
								onClick={() => addRegularizada(user.uid, asignatura.acronimo)}
							>
								<i className='bi bi-hourglass-split'></i>
							</button>

							<button title='Ver Información' className='btn btn-primary btn-sm me-2 shadow' onClick={() => navigate(`/asignaturas/${asignatura.acronimo}`)}>
								<i className='bi bi-info-lg'></i>
							</button>

							{/* <button title='Ver Correlativas' className='btn btn-primary btn-sm me-2' data-bs-toggle='modal' data-bs-target={"#" + asignatura.acronimo + "modal"}>
								<i className='bi bi-arrow-left-right'></i>
							</button> */}

							<button title='Eliminar Asignatura' disabled={!hecha} className='btn btn-danger btn-sm shadow' onClick={eliminarAsignatura}>
								<i className='bi bi-trash3'></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

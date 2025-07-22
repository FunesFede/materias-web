import React, { useState, useEffect } from "react";
import { toast, Flip } from "react-toastify";
import asigUtils from "../utils/asignaturas.js";
import { useNavigate } from "react-router";

export default function Asignatura({ asignatura }) {
	const [refreshKey, setRefreshKey] = useState(0);
	const navigate = useNavigate();

	let mensaje = asignatura.regularizadas.length > 0 ? `Regularizadas (o aprobadas): ${asignatura.regularizadas.join(", ")}` : "No requiere asignaturas regularizadas";

	mensaje = mensaje + (asignatura.aprobadas.length > 0 ? `, Aprobadas: ${asignatura.aprobadas.join(", ")}` : ", No requiere asignaturas aprobadas");

	// Listen for localStorage changes
	useEffect(() => {
		const handleStorageChange = () => {
			setRefreshKey((prev) => prev + 1);
		};

		window.addEventListener("storage", handleStorageChange);

		// Custom event for same-tab localStorage changes
		window.addEventListener("localStorageUpdate", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
			window.removeEventListener("localStorageUpdate", handleStorageChange);
		};
	}, []);

	const notify = () =>
		toast.info(mensaje, {
			position: "bottom-right",
			autoClose: 10000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
			transition: Flip,
		});

	const esHecha = () => {
		return asigUtils.esRegularizada(asignatura.acronimo) || asigUtils.esAprobada(asignatura.acronimo);
	};

	const esCursable = () => {
		for (let index = 0; index < asignatura.regularizadas.length; index++) {
			const element = asignatura.regularizadas[index];
			if (!asigUtils.esRegularizada(element)) return false;
		}

		for (let index = 0; index < asignatura.aprobadas.length; index++) {
			const element = asignatura.aprobadas[index];
			if (!asigUtils.esAprobada(element)) return false;
		}

		return true;
	};

	const handleIcono = () => {
		if (esCursable()) {
			if (esHecha()) {
				if (asigUtils.esAprobada(asignatura.acronimo)) return <i className='bi bi-check-lg'></i>;
				else return <i className='bi bi-hourglass'></i>;
			} else return <i className='bi bi-unlock-fill'></i>;
		} else return <i className='bi bi-lock-fill'></i>;
	};

	return (
		<div className='asignatura-vertical mb-3' key={refreshKey}>
			<div
				className={
					esHecha()
						? asigUtils.esAprobada(asignatura.acronimo)
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
						{asignatura.tipo == "Electiva" && <span class='badge text-bg-success'>Electiva</span>}
					</h5>

					<div className='botones-container'>
						<button
							title='Aprobar Asignatura'
							disabled={!esCursable() || asigUtils.esAprobada(asignatura.acronimo)}
							className='btn btn-success btn-sm me-2 text-white'
							onClick={() => asigUtils.aprobar(asignatura.acronimo)}
						>
							<i className='bi bi-check-lg'></i>
						</button>
						<button
							title='Regularizar Asignatura'
							disabled={!esCursable() || esHecha()}
							className='btn btn-warning btn-sm me-2 text-white'
							onClick={() => asigUtils.regularizar(asignatura.acronimo)}
						>
							<i className='bi bi-hourglass-bottom'></i>
						</button>
						<button title='Ver Información' className='btn btn-primary btn-sm me-2' onClick={() => navigate(`/materias-web/${asignatura.acronimo}`)}>
							<i className='bi bi-info'></i>
						</button>
						<button title='Ver Correlativas' className='btn btn-primary btn-sm me-2' onClick={() => notify()}>
							<i className='bi bi-arrow-left-right'></i>
						</button>
						<button title='Eliminar Cursado' disabled={!esHecha()} className='btn btn-danger btn-sm' onClick={() => asigUtils.borrar(asignatura.acronimo)}>
							<i className='bi bi-x-lg'></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

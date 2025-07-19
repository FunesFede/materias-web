import React, { useState, useEffect } from "react";
import { toast, Flip } from "react-toastify";
import asigUtils from "../utils/asignaturas.js";

export default function Asignatura({ asignatura }) {
	const [refreshKey, setRefreshKey] = useState(0);

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

	const handleRegularizar = () => {
		asigUtils.regularizar(asignatura.acronimo);
		// Trigger custom event for same-tab updates
		window.dispatchEvent(new Event("localStorageUpdate"));
	};

	const handleAprobar = () => {
		asigUtils.aprobar(asignatura.acronimo);
		// Trigger custom event for same-tab updates
		window.dispatchEvent(new Event("localStorageUpdate"));
	};

	return (
		<div className='asignatura-vertical mb-3' key={refreshKey}>
			<div
				className={
					esHecha()
						? asigUtils.esAprobada(asignatura.acronimo)
							? "card bg-success text-white"
							: "card bg-warning text-white"
						: esCursable()
						? "card bg-secondary text-white"
						: "card bg-danger text-white"
				}
			>
				<div className='card-body'>
					<h5 className='card-title'>
						{esCursable() ? <i className='bi bi-unlock-fill'></i> : <i className='bi bi-lock-fill'></i>}{" "}
						<span className={esHecha() ? "text-decoration-line-through" : ""}>{asignatura.nombre}</span>
					</h5>

					<div className='botones-container'>
						<button title='Regularizar Asignatura' disabled={!esCursable() || esHecha()} className='btn btn-primary btn-sm me-2' onClick={handleRegularizar}>
							<i className='bi bi-check'></i>
						</button>
						<button
							title='Aprobar Asignatura'
							disabled={!esCursable() || asigUtils.esAprobada(asignatura.acronimo)}
							className='btn btn-primary btn-sm me-2'
							onClick={handleAprobar}
						>
							<i className='bi bi-check-all'></i>
						</button>
						<button title='Correlatividades' className='btn btn-primary btn-sm me-2' onClick={() => notify()}>
							<i className='bi bi-info'></i>
						</button>
						<button title='Borrar' disabled={!esHecha()} className='btn btn-danger btn-sm' onClick={() => asigUtils.borrar(asignatura.acronimo)}>
							<i className='bi bi-x-lg'></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

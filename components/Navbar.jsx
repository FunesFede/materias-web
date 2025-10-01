import React from "react";
import { NavLink, useNavigate } from "react-router";
import { toast, Flip } from "react-toastify";

import asignaturas from "../data/asignaturas.json";

export default function Navbar() {
	const [query, setQuery] = React.useState("");
	const navigate = useNavigate();

	const buscarAsignatura = (e) => {
		e.preventDefault();

		if (!query.trim()) return;
		const lowerQuery = query.toLowerCase();
		const closest =
			asignaturas.find((a) => a.nombre.toLowerCase() === lowerQuery || a.acronimo.toLowerCase() === lowerQuery) ||
			asignaturas.find((a) => a.nombre.toLowerCase().includes(lowerQuery) || a.acronimo.toLowerCase().includes(lowerQuery));
		if (closest) {
			navigate(`/asignatura/${closest.acronimo}`);
		} else {
			toast.error("No hay resultados para la asignatura buscada. Asegúrese de utilizar tildes.", {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Flip,
			});
		}
	};

	return (
		<nav className='navbar navbar-expand-lg bg-body-tertiary'>
			<div className='container-fluid'>
				<a className='navbar-brand' href='#'>
					<img src='/logo.png' alt='Logo' width='100' height='30' class='d-inline-block align-text-top' />
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/'>
								Home
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/estadisticas'>
								Estadísticas
							</NavLink>
						</li>
						<li className='nav-item'>
							<a class='nav-link' data-bs-toggle='offcanvas' href='#offcanvasExample' role='button' aria-controls='offcanvasExample'>
								Guía Botones
							</a>
						</li>
					</ul>
					<form className='d-flex' role='search' onSubmit={buscarAsignatura}>
						<input
							className='form-control me-2'
							type='search'
							placeholder='Buscar Asignatura...'
							aria-label='Buscar Asignatura'
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button className='btn btn-outline-primary' type='submit'>
							Buscar
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
}

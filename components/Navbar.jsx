import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { toast, Flip } from "react-toastify";

import asignaturas from "../data/asignaturas.json";
import UserStateContext from "../utils/contexts/UserContext";
import Profile from "./Profile";

export default function Navbar({ setLoading }) {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();
	const user = useContext(UserStateContext);

	const buscarAsignatura = (e) => {
		e.preventDefault();

		if (query == "" || query == " ") navigate("/");

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
				<a className='navbar-brand' href='https://www.samas.org.ar/index.php/blog-infosam/236-octubre-rosa' target='_blank'>
					<img src='/pink-ribbon.png' alt='Logo' width='40' height='40' className='d-inline-block align-text-top' />
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
							<a className='nav-link' data-bs-toggle='offcanvas' href='#offcanvasExample' role='button' aria-controls='offcanvasExample'>
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
							disabled={!user}
						/>
						<button className='btn btn-outline-primary' type='submit' disabled={!user}>
							Buscar
						</button>
					</form>
					<Profile setLoading={setLoading} />
				</div>
			</div>
		</nav>
	);
}

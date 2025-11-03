import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { toast, Flip } from "react-toastify";

import asignaturas from "../../data/asignaturas.json";
import UserStateContext from "../../utils/contexts/UserContext";
import Profile from "../Profile";

export default function Navbar({ setAsignaturas }) {
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
			navigate(`/asignaturas/${closest.acronimo}`);
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
		<nav className='sticky-top navbar navbar-expand-lg bg-body-tertiary'>
			<div className='container-fluid'>
				<NavLink to='/' className='navbar-brand'>
					<img src='/logo.png' alt='Logo' width='100' height='30' className='d-inline-block align-text-top' />
				</NavLink>
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
						<li className='nav-item dropdown'>
							<a className='nav-link dropdown-toggle' href='#' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
								Universidad
							</a>
							<ul className='dropdown-menu'>
								<li>
									<a className='dropdown-item' href='https://a4.frc.utn.edu.ar' target='_blank' rel='noopener noreferrer'>
										Autogestión
									</a>
								</li>
								<li>
									<a className='dropdown-item' href='https://uv.frc.utn.edu.ar' target='_blank' rel='noopener noreferrer'>
										Aula Virtual
									</a>
								</li>

								<li>
									<a className='dropdown-item' href='https://www.institucional.frc.utn.edu.ar/sistemas/' target='_blank' rel='noopener noreferrer'>
										Departamento de Sistemas
									</a>
								</li>
								<li>
									<a className='dropdown-item' href='https://seu.frc.utn.edu.ar/?pIs=1286' target='_blank' rel='noopener noreferrer'>
										Pasantías
									</a>
								</li>
							</ul>
						</li>
						<li className='nav-item'>
							<a className='nav-link' data-bs-toggle='offcanvas' href='#GuiaBotones' role='button' aria-controls='GuiaBotones'>
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
					<Profile setAsignaturas={setAsignaturas} />
				</div>
			</div>
		</nav>
	);
}

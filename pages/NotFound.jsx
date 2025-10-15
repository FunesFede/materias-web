import React from "react";
import { useNavigate } from "react-router";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<div className='container-fluid py-3 min-vh-100 bg-dark text-white'>
			<div className='position-absolute top-50 start-50 translate-middle'>
				<h1 className='fw-bold'>
					<span className='text-danger'>404</span>: Not Found
				</h1>
				<h2>
					No encontramos eso, ¿
					<a target='_blank' className='link-danger link-offset-1 link-underline link-underline-opacity-25' href='https://www.youtube.com/watch?v=FPixzRVB1Vs'>
						estamos perdidas
					</a>
					?
				</h2>
				<button className='btn btn-outline-danger mt-2' onClick={() => navigate("/")}>
					<i className='bi bi-arrow-left'></i> Volver
				</button>
			</div>
		</div>
	);
}

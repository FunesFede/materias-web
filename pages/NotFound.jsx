import React from "react";
import { useNavigate } from "react-router";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<div className='container-fluid py-3 min-vh-100 bg-dark text-white'>
			<div className='position-absolute top-50 start-50 translate-middle'>
				<h2>
					No encontramos eso, ¿
					<a target='_blank' href='https://www.youtube.com/watch?v=FPixzRVB1Vs'>
						estamos perdidas
					</a>
					?
				</h2>
				<button className='btn btn-outline-primary mt-2' onClick={() => navigate("/")}>
					Volver
				</button>
			</div>
		</div>
	);
}

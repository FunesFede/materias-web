import React from "react";

export default function () {
	return (
		<footer className='footer bg-dark-custom p-2 mt-auto text-secondary'>
			<p className='m-0'>
				Hecho con <i className='bi bi-heart-fill'></i> por Fede
			</p>
			<p className='m-0'>No afiliado a la Universidad Tecnológica Nacional.</p>
			<p className='m-0'>© {new Date().getFullYear()} Fede. Todos los derechos reservados. </p>
		</footer>
	);
}

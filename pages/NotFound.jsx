import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<Container className='py-3 bg-dark text-white d-flex flex-column flex-grow-1'>
			<Container className='position-absolute top-50 start-50 translate-middle'>
				<h1 className='fw-bold'>
					404: <span className='text-danger'>Not Found</span>
				</h1>
				<h2>
					No encontramos eso, ¿
					<a
						target='_blank'
						className='link-danger link-offset-1 link-underline link-underline-opacity-0 link-underline-opacity-75-hover'
						href='https://www.youtube.com/watch?v=FPixzRVB1Vs'
					>
						estamos perdidas
					</a>
					?
				</h2>
				<br />
				<Button variant='outline-danger' className='mt-2' onClick={() => navigate("/")}>
					<i className='bi bi-arrow-left'></i> Volver
				</Button>
			</Container>
		</Container>
	);
}

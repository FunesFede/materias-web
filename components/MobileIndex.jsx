import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function MobileIndex() {
	return (
		<Container fluid className='show-mobile mb-3 container-rounded-dark p-2'>
			<h4 className='text-start mx-2'>
				<i className='bi bi-hand-index'></i> Acceso Rápido
			</h4>
			<Row className='align-items-center'>
				<Col>
					<a href='#primero' className='badge bg-gradient text-bg-secondary rounded-pill px-3 py-2 link-underline link-underline-opacity-0 m-1'>
						Primero
					</a>
					<a href='#segundo' className='badge text-bg-secondary rounded-pill px-3 py-2 link-underline link-underline-opacity-0 m-1'>
						Segundo
					</a>
					<a href='#tercero' className='badge text-bg-secondary rounded-pill px-3 py-2 link-underline link-underline-opacity-0 m-1'>
						Tercero
					</a>
					<a href='#cuarto' className='badge text-bg-secondary rounded-pill px-3 py-2 link-underline link-underline-opacity-0 m-1'>
						Cuarto
					</a>
					<a href='#quinto' className='badge text-bg-secondary rounded-pill px-3 py-2 link-underline link-underline-opacity-0 m-1'>
						Quinto
					</a>
				</Col>
			</Row>
		</Container>
	);
}

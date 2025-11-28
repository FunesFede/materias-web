import React, { useEffect, useState } from "react";
import asignaturas from "../../data/asignaturas.json";

import GraficoAvance from "./GraficoAvance";
import Container from "react-bootstrap/Container";
import { Alert, Card, Col, Row } from "react-bootstrap";

export default function EstadisticasC({ regularizadas, aprobadas, regularizadasYAprobadas }) {
	return (
		<Container fluid className='text-white'>
			<Alert variant='info' dismissible className='mx-2'>
				<div className='text-start'>
					<i className='bi bi-info-circle-fill'></i> Los totales y porcentajes solo toman en cuenta 7 electivas.
				</div>
			</Alert>

			<Row className='g-3 p-2 user-select-none'>
				<Col md={8}>
					<GraficoAvance />
				</Col>

				<Col md={4} className='d-flex flex-column gap-3'>
					<Card className='bg-info bg-gradient bg-opacity-75 text-white'>
						<Card.Body className='text-center'>
							<i className='bi bi-percent fs-1'></i>
							<h3 className='mt-2 mb-0'>%{((aprobadas.length * 100) / (asignaturas.filter((a) => a.tipo == "Obligatoria").length + 7)).toFixed(2)}</h3>
							<p className='mb-0'>Completado</p>
						</Card.Body>
					</Card>

					<Card className='bg-secondary bg-gradient text-white'>
						<Card.Body className='text-center'>
							<i className='bi bi-archive fs-1'></i>
							<h3 className='mt-2 mb-0'>{regularizadasYAprobadas.size}</h3>
							<p className='mb-0'>Total Cursadas</p>
						</Card.Body>
					</Card>

					<Card className='bg-warning bg-gradient text-white'>
						<Card.Body className='text-center'>
							<i className='bi bi-hourglass-split fs-1'></i>
							<h3 className='mt-2 mb-0'>{regularizadas.length}</h3>
							<p className='mb-0'>Asignaturas Regularizadas</p>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

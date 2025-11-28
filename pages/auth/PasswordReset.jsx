import React from "react";

import FirebasePasswordReset from "../../components/firebase/FirebasePasswordReset";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";

export default function PasswordReset() {
	return (
		<Container fluid className='bg-dark text-white d-flex flex-column flex-grow-1 align-items-center justify-content-center'>
			<Row className='g-0 w-100' style={{ maxWidth: "1000px" }}>
				<Col md={7} className='bg-dark-custom rounded-start px-4 py-5'>
					<FirebasePasswordReset />
				</Col>
				<Col md={5} className='d-none d-md-flex bg-dark-custom rounded-end d-flex align-items-center justify-content-center p-4'>
					<img draggable='false' src='/images/undraw_forgot-password.svg' className='img-fluid' style={{ maxWidth: "300px" }} alt='Password Reset illustration' />
				</Col>
			</Row>
		</Container>
	);
}

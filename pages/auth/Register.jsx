import React from "react";

import FirebaseRegister from "../../components/firebase/FirebaseRegister.jsx";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";

export default function Register({ signInSuccessFunc }) {
	return (
		<Container fluid className='bg-dark text-white d-flex flex-column flex-grow-1 flex-column flex-grow-1 align-items-center justify-content-center'>
			<Row className='g-0 w-100' style={{ maxWidth: "1000px" }}>
				<Col md={7} className='bg-dark-custom rounded-start py-4 px-5'>
					<FirebaseRegister onSignInSuccess={signInSuccessFunc} />
				</Col>
				<Col md={5} className='bg-dark-custom rounded-end d-flex align-items-center justify-content-center p-4'>
					<img draggable='false' src='/images/undraw_hello.svg' className='img-fluid' style={{ maxWidth: "300px" }} alt='Hello illustration' />
				</Col>
			</Row>
		</Container>
	);
}

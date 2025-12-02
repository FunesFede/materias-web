import React from "react";

import { useLocation } from "react-router";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import PasswordlessLogin from "../../components/firebase/PasswordlessLogin";

export default function PasswordlessLoginCallback({ signInSuccessFunc }) {
	const location = useLocation();
	return (
		<Container fluid className='bg-dark text-white d-flex flex-column flex-grow-1 align-items-center justify-content-center'>
			<Row className='g-0 w-100' style={{ maxWidth: "1000px" }}>
				<Col md={7} className='bg-dark-custom rounded-start px-4 py-5'>
					<PasswordlessLogin signIn={true} onSignInSuccess={signInSuccessFunc} from={location.state?.from} />
				</Col>
				<Col md={5} className='d-none d-md-flex bg-dark-custom rounded-end d-flex align-items-center justify-content-center p-4'>
					<img draggable='false' src='/images/undraw_2fa.svg' className='img-fluid' style={{ maxWidth: "300px" }} alt='Two-Factor Authentication illustration' />
				</Col>
			</Row>
		</Container>
	);
}

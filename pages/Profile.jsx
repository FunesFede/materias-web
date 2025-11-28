import React from "react";

import FirebaseUpdateProfile from "../components/firebase/FirebaseUpdateProfile.jsx";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";

export default function Profile() {
	return (
		<Container fluid className='bg-dark text-white d-flex flex-column flex-grow-1 align-items-center justify-content-center'>
			<Row className='g-0 w-100' style={{ maxWidth: "1000px" }}>
				<Col md={7} className='bg-dark-custom rounded-start px-4 py-5'>
					<FirebaseUpdateProfile />
				</Col>
				<Col md={5} className='d-none d-md-flex bg-dark-custom rounded-end d-flex align-items-center justify-content-center p-4'>
					<img draggable='false' src='/images/undraw_profile-data.svg' className='img-fluid' style={{ maxWidth: "300px" }} alt='Profile Data illustration' />
				</Col>
			</Row>
		</Container>
	);
}

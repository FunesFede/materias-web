import React from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

export default function SpinnerR() {
	return (
		<Container fluid className='py-3 min-vh-100 bg-dark text-white'>
			<Container className='position-absolute top-50 start-50 translate-middle'>
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			</Container>
		</Container>
	);
}

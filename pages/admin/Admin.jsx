import React from "react";
import { Container } from "react-bootstrap";
import Alerts from "../../components/admin/Alerts";

export default function Admin() {
	return (
		<Container className='py-3 bg-dark text-white d-flex flex-column flex-grow-1'>
			<Alerts />
		</Container>
	);
}

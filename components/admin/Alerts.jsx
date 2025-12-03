import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { getAlertas, removeAlerta } from "../../utils/firebase/alerts";
import AlertaModal from "./AlertaEditModal";
import AlertCreateModal from "./AlertCreateModal";

export default function Alerts() {
	const [alerts, setAlerts] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showCreate, setShowCreate] = useState(false);
	const [selectedAlert, setSelectedAlert] = useState(null);

	useEffect(() => {
		const unsubscribe = getAlertas(
			(data) => {
				setAlerts(data);
			},
			(error) => {
				console.error("Error al obtener alertas:", error);
			}
		);
		return () => unsubscribe();
	}, []);

	const handleEdit = (alert) => {
		setSelectedAlert(alert);
		setShowModal(true);
	};

	return (
		<Container fluid className='bg-dark-custom rounded p-3'>
			<AlertaModal show={showModal} setShow={setShowModal} alert={selectedAlert} />
			<AlertCreateModal show={showCreate} setShow={setShowCreate} />
			<Table responsive striped hover>
				<thead>
					<tr>
						<th scope='col'>ID</th>
						<th scope='col'>Tipo</th>
						<th scope='col'>Titulo</th>
						<th scope='col'>Contenido</th>
						<th scope='col'>Dismissable</th>
						<th scope='col'>Hidden</th>
					</tr>
				</thead>
				<tbody className='table-group-divider'>
					{alerts.length != 0 ? (
						alerts.map((alert) => {
							return (
								<tr key={alert.id} className='clickable' onClick={() => handleEdit(alert)}>
									<td>{alert.id}</td>
									<td>{alert.type}</td>
									<td>{alert.header}</td>
									<td>{alert.content}</td>
									<td>{alert?.dismissable ? "Si" : "No"}</td>
									<td>{alert?.hide ? "Si" : "No"}</td>
								</tr>
							);
						})
					) : (
						<tr>
							<td colSpan={6}>No hay alertas</td>
						</tr>
					)}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={6}>
							<span className='link-primary clickable' onClick={() => setShowCreate(true)}>
								{" "}
								<i className='bi bi-plus-lg'></i> Añadir Alerta
							</span>
						</td>
					</tr>
				</tfoot>
			</Table>
		</Container>
	);
}

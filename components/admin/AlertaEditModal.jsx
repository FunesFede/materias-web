import React, { useState } from "react";
import { Form, Modal, Button, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { editAlerta, removeAlerta } from "../../utils/firebase/alerts";
import { toast } from "react-toastify";

export default function AlertaModal({ alert, show, setShow }) {
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm({ values: alert });

	const handleModal = async (data) => {
		setLoading(true);
		try {
			await editAlerta(alert.id, data);
			toast.success("Alerta editada correctamente");
		} catch (err) {
			console.error(err);
			toast.error("Algo salió mal");
		}
		setLoading(false);
		cerrarModal();
	};

	const cerrarModal = () => {
		setShow(false);
	};

	const handleRemove = async () => {
		setLoading(true);
		try {
			await removeAlerta(alert.id);
			toast.success("Alerta eliminada correctamente");
		} catch (err) {
			console.error(err);
			toast.error("Algo salió mal");
		}
		setLoading(false);
		cerrarModal();
	};

	return (
		<Modal show={show} onHide={setShow} centered>
			<Modal.Header closeButton>
				<Modal.Title>
					<i className='bi bi-pen'></i> Editar Alerta
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={handleSubmit(handleModal)} id='alertaEditForm'>
					<Form.Group className='mb-3 text-start'>
						<FloatingLabel
							label={
								<>
									<i className='bi bi-braces'></i> Tipo
								</>
							}
						>
							<Form.Select isInvalid={errors.type} {...register("type", { required: "Un tipo es requerido" })}>
								<option value='info'>Info</option>
								<option value='warning'>Warning</option>
								<option value='danger'>Danger</option>
							</Form.Select>
						</FloatingLabel>
					</Form.Group>

					<Form.Group className='mb-3 text-start'>
						<FloatingLabel
							label={
								<>
									<i className='bi bi-card-heading'></i> Header
								</>
							}
						>
							<Form.Control placeholder='.' required autoFocus isInvalid={errors.header} {...register("header", { required: "Un titulo es requerido" })} />
							{errors.header && <Form.Control.Feedback type='invalid'>{errors.header.message}</Form.Control.Feedback>}
						</FloatingLabel>
					</Form.Group>

					<Form.Group className='mb-3 text-start'>
						<FloatingLabel
							label={
								<>
									<i className='bi bi-card-text'></i> Content
								</>
							}
						>
							<Form.Control placeholder='.' as='textarea' isInvalid={errors.content} {...register("content", { required: "El contenido es requerido" })} />
							{errors.content && <Form.Control.Feedback type='invalid'>{errors.content.message}</Form.Control.Feedback>}
						</FloatingLabel>
					</Form.Group>

					<Form.Group className='mb-3 text-start'>
						<Form.Check type='switch' label='Dismissable' {...register("dismissable")} />
						<Form.Check type='switch' label='Hide?' {...register("hide")} />
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				{/* <Button variant='danger' disabled={loading} onClick={cerrarModal}>
					<i className='bi bi-x-lg'></i> Cancelar
				</Button> */}
				<Button variant='danger' disabled={loading} onClick={() => handleRemove()}>
					<i className='bi bi-trash'></i> Eliminar
				</Button>
				<Button form='alertaEditForm' variant='primary' type='submit' disabled={loading || !isDirty}>
					<i className='bi bi-save-fill'></i> {loading ? "Guardando..." : "Guardar Alerta"}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

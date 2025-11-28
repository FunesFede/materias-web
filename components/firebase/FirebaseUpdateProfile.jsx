import React, { useContext, useState } from "react";
import { sendPasswordResetEmail, updateEmail, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import UserStateContext from "../../utils/contexts/UserContext";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";

const FirebaseUpdateProfile = () => {
	const user = useContext(UserStateContext);
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { isDirty },
		reset,
	} = useForm({
		defaultValues: {
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
		},
	});

	const handleUpdate = async (data) => {
		setLoading(true);
		try {
			await updateProfile(user, { displayName: data?.displayName });
			toast.success("Tu perfil fue actualizado correctamente!");
		} catch (err) {
			console.error("Error al actualizar perfil: ", error);
			let errorMessage = "Ocurrió un error desconocido";
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form onSubmit={handleSubmit(handleUpdate)}>
			<div className='mb-3'>
				<h3>
					{" "}
					<i className='bi bi-person-circle'></i> Tu Perfil
				</h3>
				<h5>Configurá tu perfil a tu gusto</h5>
			</div>

			<Form.Group className='mb-3 text-start'>
				<FloatingLabel
					label={
						<>
							<i className='bi bi-envelope-at-fill'></i> Email {user.emailVerified ? "(Verificado)" : "(No verificado)"}
						</>
					}
				>
					<Form.Control autoComplete='username' disabled placeholder='fede@ffede.ar' id='email' type='email' {...register("email")} />
				</FloatingLabel>
			</Form.Group>

			<Form.Group className='mb-3 text-start'>
				<FloatingLabel
					label={
						<>
							<i className='bi bi-person-badge'></i> Nombre
						</>
					}
				>
					<Form.Control autoComplete='name' placeholder='Gabriel' id='name' type='text' {...register("displayName")} />
				</FloatingLabel>
			</Form.Group>

			<Form.Group className='mb-3 text-start'>
				<FloatingLabel
					label={
						<>
							<i className='bi bi-camera-fill'></i> Foto de Perfil
						</>
					}
				>
					<Form.Control disabled placeholder='https://imgur.com/i/perfil.png' id='photo' type='text' {...register("photoURL")} />
				</FloatingLabel>
			</Form.Group>

			<Button variant='primary' type='submit' disabled={loading || !isDirty}>
				{loading ? (
					<>
						<span className='spinner-border spinner-border-sm' aria-hidden='true'></span>
						<span role='status'> Cargando...</span>
					</>
				) : (
					<>
						<i className='bi bi-save-fill'></i> Guardar Cambios
					</>
				)}
			</Button>
		</Form>
	);
};

export default FirebaseUpdateProfile;

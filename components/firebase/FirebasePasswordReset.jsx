import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";

const FirebasePasswordReset = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [done, setDone] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleAuth = async (data) => {
		setLoading(true);
		try {
			await sendPasswordResetEmail(auth, data.email);
			toast.success("Email para reestablecer contraseña enviado correctamente!");
			setDone(true);
		} catch (err) {
			let errorMessage = "Ocurrió un error desconocido. " + err.code;
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form onSubmit={handleSubmit(handleAuth)}>
			<div className='mb-3'>
				<h3>
					{" "}
					<i className='bi bi-lock-fill'></i> Reestablecé tu contraseña
				</h3>
				<h5>Recibirás un mail para reestablecerla</h5>
			</div>

			<Form.Group className='mb-3 text-start'>
				<FloatingLabel
					label={
						<>
							<i className='bi bi-envelope-at-fill'></i> Email
						</>
					}
				>
					<Form.Control placeholder='email@example.com' id='email' autoComplete='username' type='email' {...register("email", { required: true })} disabled={done} />
				</FloatingLabel>

				{errors.email && <Form.Text className='text-danger'>Un email es requerido</Form.Text>}
			</Form.Group>
			{!done ? (
				<Button variant='primary' type='submit' disabled={loading}>
					{loading ? (
						<>
							<span className='spinner-border spinner-border-sm' aria-hidden='true'></span>
							<span role='status'> Cargando...</span>
						</>
					) : (
						<>
							<i className='bi bi-key-fill'></i> Reestablecer Contraseña
						</>
					)}
				</Button>
			) : (
				<Button variant='primary' type='button' onClick={() => navigate("/login")}>
					<i className='bi bi-door-open-fill'></i> Volver al login
				</Button>
			)}
			<p className='text-secondary m-1'>
				¿No tenés una cuenta?{" "}
				<NavLink className='link-underline link-underline-opacity-0' to='/register'>
					Registrate
				</NavLink>
			</p>
		</Form>
	);
};

export default FirebasePasswordReset;

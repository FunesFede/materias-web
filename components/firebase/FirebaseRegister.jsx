import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router";

const FirebaseRegister = ({ onSignInSuccess }) => {
	const [loading, setLoading] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleAuth = async (data) => {
		setLoading(true);
		try {
			let userCredential;
			userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
			await updateProfile(userCredential.user, { displayName: data.displayName });
			onSignInSuccess(userCredential.user);
			navigate("/", { replace: true });

			await sendEmailVerification(userCredential.user);
			toast.info("Te enviamos un correo de verificación automaticamente, revisá tu bandeja de entrada para verificar tu email");
		} catch (err) {
			let errorMessage = "Ocurrió un error desconocido. " + err.code;
			switch (err.code) {
				case "auth/email-already-in-use":
					errorMessage = "El email proporcionado ya está en uso.";
					break;

				case "auth/password-does-not-meet-requirements":
					const regex = /\[[^\]]*\]/i;
					const requirements = regex.exec(err.message)[0];
					errorMessage = "La contraseña no cumple con los requisitos: " + requirements;

				default:
					console.error("Authentication Error:", err.code);
					console.error("Mensaje: ", err.message);
					break;
			}

			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(handleAuth)} className='container-fluid bg-dark-custom w-responsive rounded my-4 p-4 text-white'>
				<div className='mb-3'>
					<img src='/images/logo_2.png' alt='Logo UTN' width={35} height={40} draggable={false} />
					<h3>¡Bienvenido a tu carrera tracker!</h3>
					<h4>Por favor, completá tu registro</h4>
				</div>
				<div className='mb-3 text-start'>
					<label className='form-label' htmlFor='name'>
						<i className='bi bi-person-badge'></i> Nombre
					</label>
					<input className='form-control' autoComplete='name' id='name' type='text' {...register("displayName", { required: true })} />
					{errors.displayName && <span className='text-danger'>Un nombre es requerido</span>}
				</div>

				<div className='mb-3 text-start'>
					<label className='form-label' htmlFor='email'>
						<i className='bi bi-envelope-at-fill'></i> Email
					</label>
					<input className='form-control' autoComplete='username' type='email' {...register("email", { required: true })} />
					{errors.email && <span className='text-danger'>Un email es requerido</span>}
				</div>
				<div className='mb-3 text-start'>
					<label className='form-label' htmlFor='pass'>
						<i className='bi bi-eye-slash-fill'></i> Contraseña
					</label>

					<div class='input-group'>
						<input id='pass' type={showPass ? "text" : "password"} class='form-control' {...register("password", { required: true })} />

						<button
							class='btn btn-outline-secondary'
							type='button'
							title={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
							autoComplete='current-password'
							onClick={() => setShowPass(!showPass)}
						>
							{showPass ? <i class='bi bi-eye-slash-fill'></i> : <i class='bi bi-eye-fill'></i>}
						</button>
					</div>

					{errors.password && <span className='text-danger'>Una contraseña es requerida</span>}
				</div>

				<button type='submit' className='btn btn-primary mt-3' disabled={loading}>
					{loading ? (
						<>
							<span className='spinner-border spinner-border-sm' aria-hidden='true'></span>
							<span role='status'> Cargando...</span>
						</>
					) : (
						<>
							<i className='bi bi-person-plus-fill'></i> Registrarse
						</>
					)}
				</button>
				<p className='text-secondary mt-2'>
					¿Ya tenés una cuenta? <NavLink to='/login'>Iniciá sesión</NavLink>
				</p>
			</form>
		</>
	);
};

export default FirebaseRegister;

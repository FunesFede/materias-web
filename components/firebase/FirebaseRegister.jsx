import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useForm } from "react-hook-form";

import { toast, Flip } from "react-toastify";
import { useNavigate } from "react-router";

const FirebaseRegister = ({ onSignInSuccess }) => {
	const [loading, setLoading] = useState(false);
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
			toast.info("Hemos enviado un correo de verificación automaticamente", {
				position: "bottom-right",
				autoClose: 6000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Flip,
			});
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

			toast.error(errorMessage, {
				position: "top-center",
				autoClose: 6000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Flip,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(handleAuth)} className='container-fluid bg-dark-custom w-responsive rounded my-4 p-4 text-white'>
				<div className='mb-3'>
					<h3>
						{" "}
						<i className='bi bi-hand-thumbs-up-fill'></i> Que bueno que te unas a nosotros
					</h3>
					<h4>Completá tu registro</h4>
				</div>
				<div className='mb-3 text-start'>
					<label className='form-label' htmlFor='name'>
						<i className='bi bi-person-badge'></i> Nombre
					</label>
					<input className='form-control' id='name' type='text' {...register("displayName", { required: true })} />
					{errors.displayName && (
						<span className='text-danger'>
							<i className='bi bi-exclamation-diamond-fill'></i> Un nombre es requerido
						</span>
					)}
				</div>
				<div className='mb-3 text-start'>
					<label className='form-label' htmlFor='email'>
						<i className='bi bi-envelope-at-fill'></i> Email
					</label>
					<input className='form-control' type='email' {...register("email", { required: true })} />
					{errors.email && (
						<span className='text-danger'>
							<i className='bi bi-exclamation-diamond-fill'></i> Un email es requerido
						</span>
					)}
				</div>
				<div className='mb-3 text-start'>
					<label className='form-label' htmlFor='pass'>
						<i className='bi bi-eye-slash-fill'></i> Contraseña
					</label>
					<input className='form-control' type='password' {...register("password", { required: true })} />
					{errors.password && (
						<span className='text-danger'>
							<i className='bi bi-exclamation-diamond-fill'></i> Una contraseña es requerida
						</span>
					)}
				</div>
				<button type='submit' className='btn btn-primary' disabled={loading}>
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
					¿Ya tenés una cuenta?{" "}
					<a href='#' onClick={() => navigate("/login")}>
						Iniciá sesión
					</a>
				</p>
			</form>
		</>
	);
};

export default FirebaseRegister;

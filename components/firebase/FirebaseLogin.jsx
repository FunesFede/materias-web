import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useForm } from "react-hook-form";

import { toast, Flip } from "react-toastify";
import { NavLink, useNavigate } from "react-router";

const FirebaseLogin = ({ onSignInSuccess, from }) => {
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
			const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
			const user = userCredential.user;

			onSignInSuccess && onSignInSuccess(user);
			const to = typeof from === "string" ? from : from?.pathname || "/";
			navigate(to, { replace: true });
		} catch (err) {
			let errorMessage = "Ocurrió un error desconocido. " + (err.code || "");
			switch (err.code) {
				case "auth/invalid-credential":
					errorMessage = "Credenciales inválidas. Verifica tu email y contraseña.";
					break;
				case "auth/user-disabled":
					errorMessage = "Tu cuenta se encuentra deshabilitada.";
					break;
				case "auth/password-does-not-meet-requirements":
					errorMessage = "Tu contraseña ya no cumple con lo requerimentos, por favor, reestablecela.";
					break;
				default:
					console.error("Authentication Error:", err.code, err.message);
					break;
			}

			toast.error(errorMessage, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				newestOnTop: false,
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
						<i className='bi bi-emoji-smile-fill'></i> ¡Hola! Que bueno tenerte de nuevo
					</h3>
					<h4>Por favor, iniciá sesión</h4>
				</div>
				<div className='mb-3 text-start'>
					<label className='form-label' htmlFor='email'>
						<i className='bi bi-envelope-at-fill'></i> Email
					</label>
					<input id='email' className='form-control' autoComplete='username' type='email' {...register("email", { required: true })} />
					{errors.email && <span className='text-danger'>Un email es requerido</span>}
				</div>
				<div className='mb-3 text-start'>
					<label className='form-label' htmlFor='pass'>
						<i className='bi bi-eye-slash-fill'></i> Contraseña
					</label>
					<input id='pass' className='form-control' autoComplete='current-password' type='password' {...register("password", { required: true })} />
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
							<i className='bi bi-box-arrow-in-right'></i> Iniciar Sesión
						</>
					)}
				</button>
				<p className='text-secondary mt-2 mb-0'>
					¿Olvidaste tu contraseña? <NavLink to='/login/passwordreset'>Reestablecer contraseña</NavLink>
				</p>
				<p className='text-secondary mt-1'>
					¿No tenés una cuenta? <NavLink to='/register'>Registrate</NavLink>
				</p>
			</form>
		</>
	);
};

export default FirebaseLogin;

import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config"; // Asegúrate de que tu auth instance esté bien importada
import { useForm } from "react-hook-form";

import { toast, Flip } from "react-toastify";

const FirebaseLogin = ({ onSignInSuccess }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Función para manejar tanto el login como el registro
	// Nota: El botón de login intentará primero el login.
	const handleAuth = async (data) => {
		setLoading(true);
		setError(null);
		try {
			let userCredential;

			// Intenta iniciar sesión con la cuenta existente
			userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);

			// Si el login/registro es exitoso, llama a la función de callback
			onSignInSuccess(userCredential.user);
		} catch (err) {
			console.error("Authentication Error:", err.code, err.message);

			// Manejo de errores específicos
			let errorMessage = "Ocurrió un error desconocido. " + err.code;
			if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
				errorMessage = "Credenciales inválidas. Verifica tu email y contraseña.";
			} else if (err.code === "auth/email-already-in-use") {
				errorMessage = "Este email ya está registrado. Intenta iniciar sesión.";
			} else if (err.code === "auth/weak-password") {
				errorMessage = "Contraseña muy débil (debe tener al menos 6 caracteres).";
			}

			toast.error(errorMessage, {
				position: "bottom-right",
				autoClose: 3000,
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
		<div className='container-fluid container-rounded-dark rounded my-4 py-2 text-white'>
			<div className='mb-3'>
				<h3>
					{" "}
					<i class='bi bi-emoji-laughing-fill'></i> ¡Hola! Que bueno tenerte de nuevo.
				</h3>
				<h4>Por favor, iniciá sesión</h4>
			</div>
			<form onSubmit={handleSubmit(handleAuth)}>
				<div className='mb-3'>
					<label className='form-label' htmlFor='email'>
						<i class='bi bi-envelope-at-fill'></i> Email
					</label>
					<input className='form-control' type='email' {...register("email", { required: true })} />
					{errors.email && (
						<span className='text-danger'>
							<i class='bi bi-exclamation-diamond-fill'></i> Un email es requerido
						</span>
					)}
				</div>
				<div className='mb-3'>
					<label className='form-label' htmlFor='pass'>
						<i class='bi bi-eye-slash-fill'></i> Contraseña
					</label>
					<input className='form-control' type='password' {...register("password", { required: true })} />
					{errors.password && (
						<span className='text-danger'>
							<i class='bi bi-exclamation-diamond-fill'></i> Una contraseña es requerida
						</span>
					)}
				</div>
				<button type='submit' className='btn btn-primary'>
					Iniciar Sesión
				</button>
			</form>
		</div>
	);
};

export default FirebaseLogin;

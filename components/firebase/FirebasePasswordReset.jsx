import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useForm } from "react-hook-form";

import { toast, Flip } from "react-toastify";
import { useNavigate } from "react-router";

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
			toast.success("Email para reestablecer contraseña enviado correctamente!", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Flip,
			});
			setDone(true);
		} catch (err) {
			let errorMessage = "Ocurrió un error desconocido. " + err.code;
			toast.error(errorMessage, {
				position: "top-center",
				autoClose: 5000,
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
		<div className='container-fluid bg-dark-custom w-responsive rounded my-4 p-4 text-white'>
			<form onSubmit={handleSubmit(handleAuth)}>
				<div className='mb-3'>
					<h3>
						{" "}
						<i className='bi bi-lock-fill'></i> Reestablecé tu contraseña
					</h3>
					<h5>Recibirás un mail para reestablecerla</h5>
				</div>
				<div className='mb-3 text-start'>
					<label className='form-label' htmlFor='email'>
						<i className='bi bi-envelope-at-fill'></i> Email
					</label>
					<input className='form-control' id='email' autoComplete='username' type='email' {...register("email", { required: true })} disabled={done} />
					{errors.email && (
						<span className='text-danger'>
							<i className='bi bi-exclamation-diamond-fill'></i> Un email es requerido
						</span>
					)}
				</div>
				{!done ? (
					<button type='submit' className='btn btn-primary' disabled={loading}>
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
					</button>
				) : (
					<button type='button' className='btn btn-primary' onClick={() => navigate("/login")}>
						<i className='bi bi-door-open-fill'></i> Volver al login
					</button>
				)}
			</form>
			<p className='text-secondary m-1'>
				¿No tenés una cuenta?{" "}
				<a href='#' onClick={() => navigate("/login/register")}>
					Registrate
				</a>
			</p>
		</div>
	);
};

export default FirebasePasswordReset;

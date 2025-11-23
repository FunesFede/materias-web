import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router";

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
					{errors.email && <span className='text-danger'>Un email es requerido</span>}
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
				¿No tenés una cuenta? <NavLink to='/register'>Registrate</NavLink>
			</p>
		</div>
	);
};

export default FirebasePasswordReset;

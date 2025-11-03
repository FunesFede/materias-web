import React, { useContext, useState } from "react";
import { sendPasswordResetEmail, updateEmail, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useForm } from "react-hook-form";

import { toast, Flip } from "react-toastify";
import { useNavigate } from "react-router";
import UserStateContext from "../../utils/contexts/UserContext";

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
			toast.success("Tu perfil fue actualizado correctamente!", {
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
		} catch (err) {
			console.error("Error al actualizar perfil: ", error);
			let errorMessage = "Ocurrió un error desconocido.";
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
			<form onSubmit={handleSubmit(handleUpdate)}>
				<div className='mb-3'>
					<h3>
						{" "}
						<i className='bi bi-person-circle'></i> Tu Perfil
					</h3>
					<h5>Configurá tu perfil a tu gusto</h5>
				</div>
				<div className='mb-3 text-start'>
					<label className='form-label' htmlFor='email'>
						<i className='bi bi-envelope-at-fill'></i> Email {user.emailVerified ? "(Verificado)" : "(No verificado)"}
					</label>
					<input className='form-control' autoComplete='username' disabled placeholder='fede@ffede.ar' id='email' type='email' {...register("email")} />
				</div>
				<div className='mb-3 text-start'>
					<label className='form-label' htmlFor='name'>
						<i className='bi bi-person-badge'></i> Nombre
					</label>
					<input className='form-control' autoComplete='name' placeholder='Gabriel' id='name' type='text' {...register("displayName")} />
				</div>
				<div className='mb-3 text-start'>
					<label className='form-label' htmlFor='photo'>
						<i className='bi bi-camera-fill'></i> Foto de Perfil
					</label>
					<input className='form-control' disabled placeholder='https://imgur.com/i/perfil.png' id='photo' type='text' {...register("photoURL")} />
				</div>
				<button type='submit' className='btn btn-primary' disabled={loading || !isDirty}>
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
				</button>
			</form>
		</div>
	);
};

export default FirebaseUpdateProfile;

import React, { useContext } from "react";
import UserStateContext from "../utils/contexts/UserContext";

import { auth } from "../firebase/config";
import { sendEmailVerification, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

import { toast, Flip } from "react-toastify";

export default function Profile({ setAsignaturas }) {
	const user = useContext(UserStateContext);
	const navigate = useNavigate();

	const handleCerrarSession = () => {
		if (user) {
			signOut(auth);
			setAsignaturas(null);
		} else navigate("/login");
	};

	const handleVerifiacionEmail = async () => {
		try {
			await sendEmailVerification(user);
			toast.success("Verificación de email enviada correctamente.", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Flip,
			});
		} catch (error) {
			console.error("Error al enviar verificacion email: ", error);
			toast.error("Algo salió mal al intentar enviar la verificación de email.", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Flip,
			});
		}
	};

	return (
		<div className='dropdown ms-2 mt-2 mt-md-0'>
			<button className='btn btn-primary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
				<i className='bi bi-person-circle'></i> Perfil
			</button>
			<ul className='dropdown-menu dropdown-menu-end'>
				<li>
					<button className='dropdown-item' disabled={!user} onClick={() => navigate("/profile/settings")}>
						Configuración
					</button>
				</li>
				<li>
					<button className='dropdown-item' disabled={!user || user?.emailVerified} onClick={handleVerifiacionEmail}>
						Verificación Email {user ? (user.emailVerified ? "(Verificado)" : "(No verificado)") : ""}
					</button>
				</li>
				<li>
					<hr className='dropdown-divider' />
				</li>
				<li>
					<button className='dropdown-item' onClick={handleCerrarSession}>
						{user ? "Cerrar Sesión" : "Iniciar Sesión"}
					</button>
				</li>
			</ul>
		</div>
	);
}

import React, { useContext } from "react";
import UserStateContext from "../utils/contexts/UserContext";

import { auth } from "../firebase/config";
import { sendEmailVerification, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

import { toast } from "react-toastify";
import { Button, Dropdown, DropdownButton, DropdownToggle } from "react-bootstrap";

export default function Profile({ setAsignaturas }) {
	const user = useContext(UserStateContext);
	const navigate = useNavigate();

	const handleCerrarSession = () => {
		if (user) {
			signOut(auth)
				.catch(() => console.debug("Failed to sign out"))
				.then(() => setAsignaturas(null));
		} else navigate("/login");
	};

	const handleVerifiacionEmail = async () => {
		try {
			await sendEmailVerification(user);
			toast.success("Verificación de email enviada correctamente.");
		} catch (error) {
			console.error("Error al enviar verificacion email: ", error);
			toast.error("Algo salió mal al intentar enviar la verificación de email.");
		}
	};

	return (
		<DropdownButton
			variant='primary'
			align='end'
			className='ms-2 mt-2 mt-md-0'
			title={
				<>
					<i className='bi bi-person-circle'></i> Perfil
				</>
			}
		>
			<Dropdown.Item disabled={!user} onClick={() => navigate("/profile/settings")}>
				<i className='bi bi-gear-wide-connected'></i> Configuración
			</Dropdown.Item>

			<Dropdown.Item disabled={!user || user?.emailVerified} onClick={handleVerifiacionEmail}>
				{user ? (
					user.emailVerified ? (
						<i className='bi bi-envelope-check-fill'></i>
					) : (
						<i className='bi bi-envelope-exclamation-fill'></i>
					)
				) : (
					<i className='bi bi-envelope-at-fill'></i>
				)}{" "}
				Verificación Email {user ? (user.emailVerified ? "(Verificado)" : "(No verificado)") : ""}
			</Dropdown.Item>
			<Dropdown.Divider />
			<Dropdown.Item onClick={handleCerrarSession}>
				{user ? (
					<>
						<i className='bi bi-box-arrow-in-left'></i> Cerrar Sesión
					</>
				) : (
					<>
						<i className='bi bi-box-arrow-in-right'></i> Iniciar Sesión
					</>
				)}
			</Dropdown.Item>
		</DropdownButton>
	);
}

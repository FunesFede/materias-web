import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer, Flip } from "react-toastify";
import { useState, useEffect, use } from "react";

import Main from "../pages/Main.jsx";
import AsignaturaInfo from "../pages/AsignaturaInfo.jsx";
import Footer from "../components/Footer.jsx";
import Estadisticas from "../pages/Estadisticas.jsx";
import Navbar from "../components/Navbar.jsx";
import InfoBanner from "../components/InfoBanner.jsx";
import Login from "../pages/Login.jsx";
import Spinner from "../components/Spinner.jsx";

import { onAuthStateChanged } from "firebase/auth"; // Importa el listener
import { auth } from "../firebase/config";

import { getAsignaturaDocRef, getAsignaturas } from "../utils/firebase/asignaturas.js";

import UserStateContext from "../utils/contexts/UserContext.js";
import AsignaturasContext from "../utils/contexts/AsignaturasContext.js";

function App() {
	const [user, setUser] = useState(null);
	const [asignaturas, setAsignaturas] = useState({ regularizadas: [], aprobadas: [] });
	const [loading, setLoading] = useState(true);

	const handleSign = (user) => {
		// setUser(user);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			getAsignaturas(currentUser.uid, setAsignaturas);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		});

		return () => unsubscribe(); // Limpieza del listener
	}, []);

	console.log(user);
	console.log(loading);

	return (
		<>
			<UserStateContext.Provider value={user}>
				<AsignaturasContext.Provider value={asignaturas}>
					<BrowserRouter>
						<Navbar setLoading={setLoading} />
						{user ? (
							<Routes>
								<Route path='/' element={<Main loading={loading} />} />
								<Route path='/estadisticas' element={<Estadisticas />} />

								<Route path='/asignatura/:acrom' element={<AsignaturaInfo />} />
								<Route path='*' element={<Main />} />
							</Routes>
						) : (
							<Login signInSuccessFunc={handleSign} />
						)}
						<Footer />

						<ToastContainer
							position='bottom-right'
							autoClose={10000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick={false}
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme='dark'
							transition={Flip}
						/>
					</BrowserRouter>
				</AsignaturasContext.Provider>
			</UserStateContext.Provider>

			<div class='offcanvas offcanvas-start' tabindex='-1' id='offcanvasExample' aria-labelledby='offcanvasExampleLabel'>
				<div class='offcanvas-header'>
					<h5 class='offcanvas-title' id='offcanvasExampleLabel'>
						Guía Botones e Iconos
					</h5>
					<button type='button' class='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
				</div>
				<div class='offcanvas-body'>
					<InfoBanner />
				</div>
			</div>
		</>
	);
}

export default App;

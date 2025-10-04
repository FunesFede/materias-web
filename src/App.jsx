import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router";
import { ToastContainer, Flip } from "react-toastify";
import { useState, useEffect } from "react";

import Main from "../pages/Main.jsx";
import AsignaturaInfo from "../pages/AsignaturaInfo.jsx";
import Footer from "../components/Footer.jsx";
import Estadisticas from "../pages/Estadisticas.jsx";
import Navbar from "../components/Navbar.jsx";
import InfoBanner from "../components/InfoBanner.jsx";
import Login from "../pages/auth/Login.jsx";
import NotFound from "../pages/NotFound.jsx";
import Register from "../pages/auth/Register.jsx";
import PasswordReset from "../pages/auth/PasswordReset.jsx";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

import { getAsignaturas } from "../utils/firebase/asignaturas.js";

import UserStateContext from "../utils/contexts/UserContext.js";
import AsignaturasContext from "../utils/contexts/AsignaturasContext.js";
import Profile from "../pages/Profile.jsx";

function App() {
	const [user, setUser] = useState(null);
	const [asignaturas, setAsignaturas] = useState({ regularizadas: [], aprobadas: [] });
	const [loading, setLoading] = useState(true);

	const handleSign = (user) => {
		setLoading(true);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (currentUser) getAsignaturas(currentUser.uid, setAsignaturas);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		});

		return () => unsubscribe();
	}, []);

	const RequireAuth = ({ children }) => {
		const location = useLocation();
		if (!user && !loading) {
			return <Navigate to='/login' replace state={{ from: location }} />;
		}
		return children;
	};

	return (
		<>
			<UserStateContext.Provider value={user}>
				<AsignaturasContext.Provider value={asignaturas}>
					<BrowserRouter>
						<Navbar setLoading={setLoading} />
						<Routes>
							<Route path='/login' element={<Login signInSuccessFunc={handleSign} />} />
							<Route path='/login/register' element={<Register signInSuccessFunc={handleSign} />} />
							<Route path='/login/passwordreset' element={<PasswordReset />} />

							<Route
								path='/'
								element={
									<RequireAuth>
										<Main loading={loading} />
									</RequireAuth>
								}
							/>
							<Route
								path='/estadisticas'
								element={
									<RequireAuth>
										<Estadisticas loading={loading} />
									</RequireAuth>
								}
							/>
							<Route
								path='/asignatura/:acrom'
								element={
									<RequireAuth>
										<AsignaturaInfo />
									</RequireAuth>
								}
							/>

							<Route
								path='/profile/settings'
								element={
									<RequireAuth>
										<Profile />
									</RequireAuth>
								}
							/>

							<Route path='*' element={<NotFound />} />
						</Routes>
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

			<div className='offcanvas offcanvas-start' tabIndex='-1' id='offcanvasExample' aria-labelledby='offcanvasExampleLabel'>
				<div className='offcanvas-header'>
					<h5 className='offcanvas-title' id='offcanvasExampleLabel'>
						Guía Botones e Iconos
					</h5>
					<button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
				</div>
				<div className='offcanvas-body'>
					<InfoBanner />
				</div>
			</div>
		</>
	);
}

export default App;

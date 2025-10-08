import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router";
import { ToastContainer, Flip } from "react-toastify";
import { useState, useEffect } from "react";

import Home from "../pages/Home.jsx";
import AsignaturaInfo from "../pages/AsignaturaInfo.jsx";
import Footer from "../components/Footer.jsx";
import Estadisticas from "../pages/Estadisticas.jsx";
import Navbar from "../components/Navbar.jsx";
import InfoBanner from "../components/InfoBanner.jsx";
import Login from "../pages/auth/Login.jsx";
import NotFound from "../pages/NotFound.jsx";
import Register from "../pages/auth/Register.jsx";
import PasswordReset from "../pages/auth/PasswordReset.jsx";
import Spinner from "../components/Spinner.jsx";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

import { getAsignaturas } from "../utils/firebase/asignaturas.js";

import UserStateContext from "../utils/contexts/UserContext.js";
import AsignaturasContext from "../utils/contexts/AsignaturasContext.js";
import Profile from "../pages/Profile.jsx";

function App() {
	const [user, setUser] = useState(null);
	const [asignaturas, setAsignaturas] = useState(null);
	const [loading, setLoading] = useState(true);
	const [authChecked, setAuthChecked] = useState(false);

	const handleSignInSuccess = (user) => {
		setLoading(true);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (currentUser) getAsignaturas(currentUser.uid, setAsignaturas);
			setAuthChecked(true);
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (asignaturas) setLoading(false);
		else setLoading(true);
	}, [asignaturas]);

	const RequireAuth = ({ children }) => {
		const location = useLocation();
		if (authChecked && !user) return <Navigate to='/login' replace state={{ from: location }} />;
		if (loading || !authChecked) return <Spinner />;
		return children;
	};

	return (
		<>
			<UserStateContext.Provider value={user}>
				<AsignaturasContext.Provider value={asignaturas}>
					<BrowserRouter>
						<Navbar setAsignaturas={setAsignaturas} />
						<Routes>
							<Route path='/login' element={<Login signInSuccessFunc={handleSignInSuccess} />} />
							<Route path='/login/register' element={<Register signInSuccessFunc={handleSignInSuccess} />} />
							<Route path='/login/passwordreset' element={<PasswordReset />} />

							<Route
								path='/'
								element={
									<RequireAuth>
										<Home />
									</RequireAuth>
								}
							/>
							<Route
								path='/estadisticas'
								element={
									<RequireAuth>
										<Estadisticas />
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

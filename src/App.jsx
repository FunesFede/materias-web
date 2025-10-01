import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer, Flip } from "react-toastify";

import Main from "../pages/Main.jsx";
import AsignaturaInfo from "../pages/AsignaturaInfo.jsx";
import Footer from "../components/Footer.jsx";
import Estadisticas from "../pages/Estadisticas.jsx";
import Navbar from "../components/Navbar.jsx";
import InfoBanner from "../components/InfoBanner.jsx";

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/estadisticas' element={<Estadisticas />} />
					<Route path='/asignatura/:acrom' element={<AsignaturaInfo />} />
					<Route path='*' element={<Main />} />
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

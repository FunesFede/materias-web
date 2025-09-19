import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer, Flip } from "react-toastify";

import Main from "../pages/Main.jsx";
import AsignaturaInfo from "../pages/AsignaturaInfo.jsx";
import Footer from "../components/Footer.jsx";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Main />} />
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
		</>
	);
}

export default App;

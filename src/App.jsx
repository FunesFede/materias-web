import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer, Flip } from "react-toastify";

import Main from "../pages/Main.jsx";
import AsignaturaInfo from "../pages/AsignaturaInfo.jsx";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/materias-web' element={<Main />} />
					<Route path='/materias-web/:acrom' element={<AsignaturaInfo />} />
				</Routes>
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

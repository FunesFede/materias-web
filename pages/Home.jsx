import { useContext, useState } from "react";
import UserStateContext from "../utils/contexts/UserContext.js";

import asignaturasData from "../data/asignaturas.json";

import Asignatura from "../components/Asignatura.jsx";

import CorrelativasModal from "../components/modals/CorrelativasModal.jsx";
import SetNotaModal from "../components/modals/SetNotaModal.jsx";

export default function Main() {
	const user = useContext(UserStateContext);
	const [setLoading, loading] = useState(false);

	const primerAnio = asignaturasData.filter((asignatura) => asignatura.anio == 1).sort((a, b) => a.nombre.localeCompare(b.nombre));
	const segundoAnio = asignaturasData.filter((asignatura) => asignatura.anio == 2).sort((a, b) => a.nombre.localeCompare(b.nombre));
	const tercerAnio = asignaturasData.filter((asignatura) => asignatura.anio == 3).sort((a, b) => a.nombre.localeCompare(b.nombre));
	const cuartoAnio = asignaturasData.filter((asignatura) => asignatura.anio == 4).sort((a, b) => a.nombre.localeCompare(b.nombre));
	const quintoAnio = asignaturasData.filter((asignatura) => asignatura.anio == 5).sort((a, b) => a.nombre.localeCompare(b.nombre));

	const handleSaludo = () => {
		const now = new Date();
		const hora = now.getHours();

		if (hora >= 6 && hora < 12) return "🌤 Buenos días";
		if (hora >= 12 && hora < 20) return "🌄 Buenas tardes";
		if (hora >= 20 || hora < 6) return "🌙 Buenas noches";
		else return "👋 Hola";
	};

	return (
		<>
			<div className='container-fluid py-3 bg-dark text-white d-flex flex-column flex-grow-1'>
				{asignaturasData.map((a) => {
					return (
						<span key={a.acronimo}>
							<SetNotaModal userId={user.uid} asignatura={a} key={a.acronimo + "NotaModal"} />
							<CorrelativasModal asignatura={a} key={a.acronimo + "modal"} />
						</span>
					);
				})}
				<div className='container-fluid'>
					<h3 className='text-start'>
						{handleSaludo()}, {user?.displayName ? user.displayName + "." : "como estás hoy?"}
					</h3>
					<div className='columnas-grid'>
						<div key={1} className='columna'>
							<h3 className='titulo-columna'>Primer Año</h3>
							<div className='asignaturas-container'>
								{primerAnio.map((asig, index) => (
									<Asignatura key={index} asignatura={asig}></Asignatura>
								))}
							</div>
						</div>

						<div key={2} className='columna'>
							<h3 className='titulo-columna'>Segundo Año</h3>
							<div className='asignaturas-container'>
								{segundoAnio.map((asig, index) => (
									<Asignatura key={index} asignatura={asig}></Asignatura>
								))}
							</div>
						</div>

						<div key={3} className='columna'>
							<h3 className='titulo-columna'>Tercer Año</h3>
							<div className='asignaturas-container'>
								{tercerAnio.map((asig, index) => (
									<Asignatura key={index} asignatura={asig}></Asignatura>
								))}
							</div>
						</div>

						<div key={4} className='columna'>
							<h3 className='titulo-columna'>Cuarto Año</h3>
							<div className='asignaturas-container'>
								{cuartoAnio.map((asig, index) => (
									<Asignatura key={index} asignatura={asig}></Asignatura>
								))}
							</div>
						</div>

						<div key={5} className='columna'>
							<h3 className='titulo-columna'>Quinto Año</h3>
							<div className='asignaturas-container'>
								{quintoAnio.map((asig, index) => (
									<Asignatura key={index} asignatura={asig}></Asignatura>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

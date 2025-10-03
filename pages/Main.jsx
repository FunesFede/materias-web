import Asignatura from "../components/Asignatura.jsx";

import asignaturas from "../data/asignaturas.json";
import Spinner from "../components/Spinner.jsx";

export default function Main({ loading }) {
	const primerAnio = asignaturas.filter((asignatura) => asignatura.anio == 1);
	const segundoAnio = asignaturas.filter((asignatura) => asignatura.anio == 2);
	const tercerAnio = asignaturas.filter((asignatura) => asignatura.anio == 3);
	const cuartoAnio = asignaturas.filter((asignatura) => asignatura.anio == 4);
	const quintoAnio = asignaturas.filter((asignatura) => asignatura.anio == 5);

	return (
		<>
			<div className='container-fluid py-3 min-vh-100 bg-dark text-white'>
				{loading ? (
					<Spinner />
				) : (
					<div className='container-fluid'>
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
				)}
			</div>
		</>
	);
}

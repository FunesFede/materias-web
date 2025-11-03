import React, { useContext, useEffect, useState } from "react";

import AsignaturasContext from "../../utils/contexts/AsignaturasContext";
import NotasContext from "../../utils/contexts/NotasContext";

export default function Promedio() {
	const asignaturas = useContext(AsignaturasContext);
	const notas = useContext(NotasContext);
	const [aplazos, setAplazos] = useState(0);

	const notasArray = Object.values(notas);
	const sumaNotas = notasArray.reduce((acc, nota) => acc + nota, 0);
	const cantidadNotas = notasArray.length;

	console.log(notasArray);

	const promedio = cantidadNotas > 0 ? (sumaNotas / cantidadNotas).toFixed(2) : 0;
	const promAplazos = aplazos != 0 ? ((sumaNotas + aplazos * 2) / (cantidadNotas + aplazos)).toFixed(2) : promedio;

	return (
		<div className='container-fluid container-rounded-dark rounded my-4 py-3 text-white max-width-80'>
			<div className='row mb-3'>
				<h4>
					<i className='bi bi-stickies-fill'></i> Tu Promedio
				</h4>
			</div>
			<div className='row justify-content-center'>
				<div className='col-4'>
					<h5>
						<i className='bi bi-folder'></i> Promedio sin aplazos: {promedio}
					</h5>
				</div>

				<div className='col-4 d-flex flex-column align-items-center'>
					<h5>
						<i className='bi bi-folder-x'></i> Promedio con aplazos: {promAplazos}
					</h5>

					<div className='d-flex align-items-center mt-2'>
						<label htmlFor='inputAplazos' className='me-2 mb-0'>
							Cantidad de aplazos:
						</label>
						<input
							id='inputAplazos'
							defaultValue={0}
							onChange={(e) => setAplazos(Number(e.target.value))}
							className='form-control'
							style={{ width: 60 }}
							type='number'
							min={0}
						/>
					</div>
				</div>
			</div>
			{asignaturas?.aprobadas.length != Object.values(notas).length ? (
				<div className='alert alert-warning my-2' role='alert'>
					<i className='bi bi-exclamation-triangle-fill'></i> La cantidad de notas no es igual a la cantidad de aprobadas registradas. Es posible que tengas asignaturas
					aprobadas sin una nota final registrada. <span className='fw-bold'>Esto afecta el cálculo de tu promedio</span>.
				</div>
			) : (
				""
			)}
		</div>
	);
}

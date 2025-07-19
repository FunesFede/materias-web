import React from "react";
import ColumnaAsignaturas from "../components/ColumnaAsignaturas.jsx";

export default function MainAlternativo() {
	// Datos organizados por columnas/años
	const datosColumnas = [
		{
			titulo: "Primero",
			asignaturas: [{ nombre: "Matemática I" }, { nombre: "Física I" }, { nombre: "Química" }],
		},
		{
			titulo: "Segundo",
			asignaturas: [{ nombre: "Matemática II" }, { nombre: "Física II" }, { nombre: "Programación I" }, { nombre: "Álgebra" }],
		},
		{
			titulo: "Tercero",
			asignaturas: [{ nombre: "Matemática III" }, { nombre: "Programación II" }, { nombre: "Base de Datos" }, { nombre: "Sistemas Operativos" }],
		},
		{
			titulo: "Cuarto",
			asignaturas: [{ nombre: "Ingeniería de Software" }, { nombre: "Redes" }, { nombre: "Inteligencia Artificial" }],
		},
		{
			titulo: "Quinto",
			asignaturas: [{ nombre: "Proyecto Final" }, { nombre: "Práctica Profesional" }],
		},
	];

	return (
		<div className='container-fluid my-2 min-vh-100 bg-dark text-white'>
			<div className='container-fluid'>
				<h1 className='text-center mb-4'>Plan de Estudios</h1>

				{/* Usando el componente ColumnaAsignaturas */}
				<div className='row g-3'>
					{datosColumnas.map((columna, index) => (
						<div key={index} className='col-lg col-md-6 col-sm-12'>
							<ColumnaAsignaturas titulo={columna.titulo} asignaturas={columna.asignaturas} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

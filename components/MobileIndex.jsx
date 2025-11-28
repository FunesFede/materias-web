import React from "react";

export default function MobileIndex() {
	return (
		<div className='show-mobile m-3 container-rounded-dark p-2'>
			<h4 className='text-start mx-2'>
				<i className='bi bi-hand-index'></i> Índice Rápido
			</h4>
			<div className='row align-items-center'>
				<div className='column'>
					<a href='#primero' className='badge text-bg-secondary rounded-pill px-3 py-2 link-underline link-underline-opacity-0 m-1'>
						Primero
					</a>
					<a href='#segundo' className='badge text-bg-secondary rounded-pill px-3 py-2 link-underline link-underline-opacity-0 m-1'>
						Segundo
					</a>
					<a href='#tercero' className='badge text-bg-secondary rounded-pill px-3 py-2 link-underline link-underline-opacity-0 m-1'>
						Tercero
					</a>
					<a href='#cuarto' className='badge text-bg-secondary rounded-pill px-3 py-2 link-underline link-underline-opacity-0 m-1'>
						Cuarto
					</a>
					<a href='#quinto' className='badge text-bg-secondary rounded-pill px-3 py-2 link-underline link-underline-opacity-0 m-1'>
						Quinto
					</a>
				</div>
			</div>
			{/* <ul className='list-group list-group-horizontal m-2 text-start'>
				<a href='#primero' className='list-group-item list-group-item-action'>
					Primero
				</a>
				<a href='#segundo' className='list-group-item list-group-item-action'>
					Segundo
				</a>
				<a href='#tercero' className='list-group-item list-group-item-action'>
					Tercero
				</a>
			</ul>
			<ul className='list-group list-group-horizontal m-2 text-start'>
				<a href='#cuarto' className='list-group-item list-group-item-action'>
					Cuarto
				</a>
				<a href='#quinto' className='list-group-item list-group-item-action'>
					Quinto
				</a>
			</ul> */}
		</div>
	);
}

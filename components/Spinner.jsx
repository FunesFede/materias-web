import React from "react";

export default function Spinner() {
	return (
		<div className='container-fluid py-3 min-vh-100 bg-dark text-white'>
			<div className='d-flex justify-content-center'>
				<div className='spinner-border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			</div>
		</div>
	);
}

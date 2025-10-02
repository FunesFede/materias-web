import React from "react";

export default function Spinner() {
	return (
		<div className='container-fluid py-3 min-vh-100 bg-dark text-white'>
			<div class='d-flex justify-content-center'>
				<div class='spinner-border' role='status'>
					<span class='visually-hidden'>Loading...</span>
				</div>
			</div>
		</div>
	);
}

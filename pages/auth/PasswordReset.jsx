import React from "react";

import FirebasePasswordReset from "../../components/firebase/FirebasePasswordReset";

export default function PasswordReset() {
	return (
		<div className='container-fluid bg-dark text-white d-flex flex-column flex-grow-1 justify-content-center'>
			<FirebasePasswordReset />
		</div>
	);
}

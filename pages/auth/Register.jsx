import React from "react";

import FirebaseRegister from "../../components/firebase/FirebaseRegister.jsx";

export default function Register({ signInSuccessFunc }) {
	return (
		<div className='container-fluid bg-dark text-white d-flex flex-column flex-grow-1 justify-content-center'>
			<FirebaseRegister onSignInSuccess={signInSuccessFunc} />
		</div>
	);
}

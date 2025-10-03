import React from "react";

import FirebaseRegister from "../../components/firebase/FirebaseRegister.jsx";

export default function Register({ signInSuccessFunc }) {
	return (
		<div className='container-fluid py-3 min-vh-100 bg-dark text-white'>
			<FirebaseRegister onSignInSuccess={signInSuccessFunc} />
		</div>
	);
}

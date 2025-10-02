import React from "react";

import FirebaseLogin from "../components/FirebaseLogin.jsx";

export default function Login({ signInSuccessFunc }) {
	return (
		<div className='container-fluid py-3 min-vh-100 bg-dark text-white'>
			<FirebaseLogin onSignInSuccess={signInSuccessFunc} />
		</div>
	);
}

import React from "react";

import FirebaseLogin from "../../components/firebase/FirebaseLogin.jsx";
import { useLocation } from "react-router";

export default function Login({ signInSuccessFunc }) {
	const location = useLocation();
	return (
		<div className='container-fluid bg-dark text-white d-flex flex-column flex-grow-1 justify-content-center'>
			<FirebaseLogin onSignInSuccess={signInSuccessFunc} from={location.state?.from} />
		</div>
	);
}

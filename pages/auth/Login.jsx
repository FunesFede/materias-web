import React from "react";

import FirebaseLogin from "../../components/firebase/FirebaseLogin.jsx";
import { useLocation } from "react-router";

export default function Login({ signInSuccessFunc }) {
	const location = useLocation();
	return (
		<div className='container-fluid py-3 min-vh-100 bg-dark text-white'>
			<FirebaseLogin onSignInSuccess={signInSuccessFunc} from={location.state?.from} />
		</div>
	);
}

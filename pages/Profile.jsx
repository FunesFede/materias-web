import React from "react";

import FirebaseUpdateProfile from "../components/firebase/FirebaseUpdateProfile.jsx";

export default function Profile() {
	return (
		<div className='container-fluid py-3 min-vh-100 bg-dark text-white'>
			<FirebaseUpdateProfile />
		</div>
	);
}

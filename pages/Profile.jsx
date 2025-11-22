import React from "react";

import FirebaseUpdateProfile from "../components/firebase/FirebaseUpdateProfile.jsx";

export default function Profile() {
	return (
		<div className='container-fluid bg-dark text-white d-flex flex-column flex-grow-1 justify-content-center'>
			<FirebaseUpdateProfile />
		</div>
	);
}

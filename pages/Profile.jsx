import React from "react";

import FirebaseUpdateProfile from "../components/firebase/FirebaseUpdateProfile.jsx";

export default function Profile() {
	return (
		<div className='container-fluid py-3 bg-dark text-white d-flex flex-column flex-grow-1'>
			<FirebaseUpdateProfile />
		</div>
	);
}

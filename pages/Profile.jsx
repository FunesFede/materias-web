import React from "react";

import FirebaseUpdateProfile from "../components/firebase/FirebaseUpdateProfile.jsx";
import Spinner from "../components/Spinner.jsx";

export default function Profile({ loading }) {
	return <div className='container-fluid py-3 min-vh-100 bg-dark text-white'>{loading ? <Spinner /> : <FirebaseUpdateProfile />}</div>;
}

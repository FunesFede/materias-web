import { db } from "../../firebase/config.js";
import { collection, doc, getDocs, setDoc, onSnapshot, addDoc, deleteDoc } from "firebase/firestore";

export const getAlertasOnce = async () => {
	const colRef = collection(db, "alerts");
	const snapshot = await getDocs(colRef);
	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
};

/**
 * Establece un listener en tiempo real para obtener las alertas.
 * @param {function} callback - Función a ejecutar con los datos (array de alertas).
 * @param {function} onError - Función a ejecutar si hay un error.
 * @returns {function} Función de 'unsubscribe' para limpiar el listener.
 */
export const getAlertas = (callback, onError) => {
	const colRef = collection(db, "alerts");

	const unsubscribe = onSnapshot(
		colRef,
		(snapshot) => {
			const alerts = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			callback && callback(alerts);
		},
		(error) => {
			console.error("Error en onSnapshot de alertas:", error);
			if (onError) onError(error);
		}
	);

	return unsubscribe;
};

export const editAlerta = async (id, data) => {
	const docRef = doc(db, "alerts", id);

	try {
		await setDoc(docRef, data, { merge: true });
		return true;
	} catch (error) {
		console.error("editAlerta error: ", error);
		return false;
	}
};

export const addAlerta = async (data) => {
	const colRef = collection(db, "alerts");

	try {
		await addDoc(colRef, data);
		return true;
	} catch (error) {
		console.error("addAlerta error: ", error);
		return false;
	}
};

export const removeAlerta = async (id) => {
	const docRef = doc(db, "alerts", id);
	await deleteDoc(docRef);
};

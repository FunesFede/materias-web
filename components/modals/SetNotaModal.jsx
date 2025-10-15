import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { addAprobada } from "../../utils/firebase/asignaturas";

import { Modal } from "bootstrap";
import { addNota } from "../../utils/firebase/notas";

import { toast, Flip } from "react-toastify";

export default function SetNotaModal({ userId, asignatura, aNota }) {
	const [loading, setLoading] = useState(false);
	const modalRef = useRef(null);
	const modalInstance = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm({ defaultValues: { nota: aNota } });

	useEffect(() => {
		if (modalRef.current) {
			modalInstance.current = new Modal(modalRef.current);
		}
	}, []);

	const handleModal = async (data) => {
		setLoading(true);
		console.log(data);
		const notaAdded = await addNota(userId, asignatura.acronimo, data.nota);
		const aprobadaAdded = aNota ? true : await addAprobada(userId, asignatura.acronimo);

		if (!notaAdded || !aprobadaAdded) {
			toast.error("Algo salió mal al intentar registrar la asignatura como aprobada. Intentá de nuevo.", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				newestOnTop: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Flip,
			});
		}

		setLoading(false);
		cerrarModal();
	};

	const cerrarModal = () => {
		if (modalInstance.current) {
			modalInstance.current.hide();
			document.getElementById(asignatura.acronimo + "btnNotaModal")?.focus();
		}
	};

	return (
		<div ref={modalRef} className='modal fade' id={asignatura.acronimo + "NotaModal"} key={asignatura.acronimo + "NotaModal"} tabIndex='-1' aria-labelledby='setNotaModal'>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h1 className='modal-title fs-5 text-start' id='setNotaModalTitle'>
							<i className='bi bi-pen'></i> Nota exámen final: {asignatura.nombre}
						</h1>
					</div>
					<form onSubmit={handleSubmit(handleModal)}>
						<div className='modal-body'>
							{aNota ? (
								""
							) : (
								<p className='text-start'>
									<i className='bi bi-info-circle'></i> Antes de marcar como aprobada la asignatura, debés proveer la nota del exámen final. Esto es para calcular
									tu promedio.
								</p>
							)}
							<div className='mb-3 text-start'>
								<label className='form-label' htmlFor='notaInput'>
									<i className='bi bi-123'></i> Nota
								</label>
								<input id='notaInput' autoFocus className='form-control' type='number' min={6} max={10} {...register("nota", { required: true })} />
								{errors.nota && <span className='text-danger'>Una nota es requerida</span>}
							</div>
						</div>
						<div className='modal-footer'>
							<button type='button' className='btn btn-danger' disabled={loading} onClick={cerrarModal}>
								<i className='bi bi-x-lg'></i> Cancelar
							</button>
							<button className='btn btn-primary' type='submit' disabled={loading || !isDirty}>
								<i className='bi bi-save-fill'></i> {loading ? "Guardando..." : "Guardar Nota"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

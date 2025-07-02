import "../styles/deletStudents.css";
import useStore from "../store";
import Swal from "sweetalert2";

export const DeletStudents = (props) => {
	const { backendUrl } = useStore();
	const deleteStudent = async () => {
		const requestOptions = {
			method: "PUT",
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/delete_student/${props.inputValue.id}`, requestOptions);
			if (response.status === 200) {
				props.getStudents();
			}
		} catch (error) {
			console.error(error);
		}
	};
	const handleClick = () => {
		Swal.fire({
			title: `¡Hora de dormir ${props.inputValue.name}!`,
			text: `Para evitar perder los registros de ${props.inputValue.name}, cambiaremos su estado a DESACTIVADO, si deseas recuperarlos solo debes volver a agregar al estudiante`,
			showCancelButton: true,
			confirmButtonText: "Confirmar",
			cancelButtonText: "Cancelar",
			confirmButtonColor: "rgb(196, 159, 59)",
			theme: "dark"
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				deleteStudent();
				Swal.fire({
					title: "Alumno desactivado con éxito",
					icon: "success",
					confirmButtonColor: "rgb(196, 159, 59)",
					theme: "dark"
				});
			}
		});
	};
	return (
		<>
			<div className="tooltip-wrapper">
				<button type="submit" className="btn btn-danger btn-sm w-50 " onClick={handleClick}>
					<i className="bi bi-trash3-fill"></i>
				</button>
				<span className="tooltip-text">Eliminar estudiante</span>
			</div>
		</>
	);
};

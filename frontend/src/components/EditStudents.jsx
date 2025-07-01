import useStore from "../store";

export const EditStudents = (props) => {
	const { backendUrl } = useStore();
	const editStudent = async () => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify(props.inputValue);

		const requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/edit_student/${props.inputValue.id}`, requestOptions);
			if (response.status == 200) {
				props.getStudents();
			}
		} catch (error) {
			console.error(error);
		}
	};
	const handleClick = () => {
		editStudent();
	};
	return (
		<button type="submit" className="btn btn-success btn-sm mt-3" onClick={handleClick}>
			Confirmar Cambios
		</button>
	);
};

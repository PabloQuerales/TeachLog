import "../styles/UserProfile.css";
import useStore from "../store";
export const UserProfile = () => {
	const { userLogged } = useStore();
	return (
		<div className="container p-0 d-flex flex-column vw-100 ">
			<div className="user-header">
				<h1 className="m-0">Prueba</h1>
				<img src={`https://api.dicebear.com/9.x/initials/svg?seed=${userLogged.name}`} className="user-avatar" />
			</div>
			<div className="user-content">
				<h2>de esfuerzo</h2>
			</div>
		</div>
	);
};

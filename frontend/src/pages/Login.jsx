import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";
// import { Context } from "../store/appContext";

export const Login = () => {
	const [isRegistered, setIsRegistered] = useState(true);
	// const { store, actions } = useContext(Context);

	// useEffect(() => {
	// 	if (store.theme === "dark") {
	// 		actions.toggleTheme();
	// 	}
	// }, []);
	return (
		<div className="container-login">
			<div className="login w-75">
				<div className="w-50 login-left">
					<h1 className="optima-title">Bienvenido a TeachLog</h1>
					<p>
						TeachLog es una app de gestión diseñada para profesores remotos. Con ella podrás: Registrar, editar o eliminar tus estudiantes fácilmente.
						Asignar precios a tus clases por hora, en diferentes monedas. Visualizar un balance mensual y un histórico de tu trabajo acumulado.
						Organiza tus clases, mejora tu seguimiento y enfócate en enseñar. ¡Empieza ahora!
					</p>
				</div>
				{isRegistered ? <div className="login-right w-50 ">{<SignupForm />}</div> : <div className="login-right w-50 ">{<LoginForm />}</div>}
			</div>
		</div>
	);
};

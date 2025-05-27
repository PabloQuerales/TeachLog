import { useState } from "react";
import useStore from "../store";
import "../styles/login.css";
// import { Context } from "../store/appContext";
// import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
	const [invalidAccount, setInvalidAccount] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const { store, actions } = useContext(Context);
	// let navigate = useNavigate();

	// const handleClick = () => {
	// 	navigate("/registro");
	// };

	// async function handleSubmit(e) {
	// 	e.preventDefault();
	// 	await actions.login(email, password);
	// 	if (!store.auth) {
	// 		setInvalidAccount(true);
	// 	} else {
	// 		setInvalidAccount(false);
	// 	}
	// }

	// useEffect(() => {
	// 	if (store.auth) {
	// 		navigate("/cuentas");
	// 	} else {
	// 		navigate("/");
	// 	}
	// 	if (invalidAccount) {
	// 		setInvalidAccount(false);
	// 	}
	// }, [store.auth]);
	const { toggleIsFlipped } = useStore();

	return (
		<>
			<form /*onSubmit={handleSubmit}*/ className="form-container mx-auto w-50 ">
				<div className="input-container">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Correo
					</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>
				<div className="input-container">
					<label htmlFor="exampleInputPassword1" className="form-label">
						Contraseña
					</label>
					<input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} />
					{!invalidAccount ? (
						<div id="emailHelp" className="form-text">
							Nunca compartiremos su correo electrónico con nadie más.
						</div>
					) : (
						<div id="emailHelp" className="form-text invalidAccount">
							Correo o Contraseña incorrectos
						</div>
					)}
				</div>
				<div className="input-container mt-4">
					<button type="submit" className="btn btn-primary w-100">
						INICIAR SESION
					</button>
					<div
						className="form-text register-text highlight-text mt-2"
						// onClick={() => {
						// 	navigate("/recuperar-contrasena");
						// }}
					>
						Olvidé mi contraseña
					</div>
					<hr className="hr-login" />
				</div>
				<div className="register-container">
					<spam className="form-text register-text">¿Aún no estás registrado?</spam>
					<button className="btn btn-secondary w-100 mb-2" onClick={() => toggleIsFlipped()}>
						Crear usuario
					</button>
				</div>
			</form>
		</>
	);
};

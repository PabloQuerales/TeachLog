import { useState } from "react";
import useStore from "../store";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
	const [invalidAccount, setInvalidAccount] = useState(false);
	const [loginForm, setLoginForm] = useState({ email: "", password: "" });
	let navigate = useNavigate();
	const { toggleIsFlipped, backendUrl } = useStore();

	const login = async (value) => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("api-key", "OMpqVWAH.UC80wyXTtPwhDgAUdCTx6");
		console.log(value);
		const raw = JSON.stringify({
			email: value.email,
			password: value.password
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/login`, requestOptions);
			const result = await response.json();
			console.log(result);
			if (response.status === 200) {
				localStorage.setItem("token", JSON.stringify(result));
				setLoginForm({ email: "", password: "" });
			} else {
				setInvalidAccount(false);
			}
		} catch (error) {
			console.error(error);
		}
	};

	async function handleSubmit(e) {
		e.preventDefault();
		await login(loginForm);
		// if (!store.auth) {
		// } else {
		// 	setInvalidAccount(false);
		// }
	}

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

	return (
		<>
			<form onSubmit={handleSubmit} className="form-container mx-auto w-50 ">
				<div className="input-container">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Correo
					</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
						value={loginForm.email}
					/>
				</div>
				<div className="input-container">
					<label htmlFor="exampleInputPassword1" className="form-label">
						Contraseña
					</label>
					<input
						type="password"
						className="form-control"
						id="exampleInputPassword1"
						onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
						value={loginForm.password}
					/>
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
					<button type="button" className="btn btn-secondary w-100 mb-2" onClick={() => toggleIsFlipped()}>
						Crear usuario
					</button>
				</div>
			</form>
		</>
	);
};

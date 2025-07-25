import { useState } from "react";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
	const [invalidAccount, setInvalidAccount] = useState(false);
	const [loginForm, setLoginForm] = useState({ email: "", password: "" });
	const [charge, setCharge] = useState(false);
	let navigate = useNavigate();
	const { toggleIsFlipped, backendUrl } = useStore();

	const login = async (value) => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		const raw = JSON.stringify({
			email: value.email,
			password: value.password
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
			credentials: "include"
		};

		try {
			const response = await fetch(`${backendUrl}/login`, requestOptions);
			if (response.status === 200) {
				setLoginForm({ email: "", password: "" });
				navigate("/lobby");
			} else {
				setInvalidAccount(true);
				setCharge(false);
			}
		} catch (error) {
			console.error(error);
		}
	};

	async function handleSubmit(e) {
		e.preventDefault();
		setCharge(true);
		await login(loginForm);
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="form-container mx-auto w-50 ">
				<div className="input-container">
					<label htmlFor="exampleInputEmail1" className="form-label title">
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
					<label htmlFor="exampleInputPassword1" className="form-label title">
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
						<div id="emailHelp" className="form-text title">
							Nunca compartiremos su correo electrónico con nadie más.
						</div>
					) : (
						<div id="emailHelp" className="form-text invalidAccount title">
							Correo o Contraseña incorrectos
						</div>
					)}
				</div>
				<div className="input-container mt-4">
					{charge ? (
						<button type="submit" className="btn button-accent w-100 " disabled={charge}>
							<>
								INICIAR SESION <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
							</>
						</button>
					) : (
						<button type="submit" className="btn button-accent w-100" disabled={charge}>
							<>INICIAR SESION</>
						</button>
					)}
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
					<p className="form-text register-text m-0 title">¿Aún no estás registrado?</p>
					<button type="button" className="btn btn-secondary w-100 mb-2" onClick={() => toggleIsFlipped()}>
						Crear usuario
					</button>
				</div>
			</form>
		</>
	);
};

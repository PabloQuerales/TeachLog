// import useNavigate from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

export const SignupForm = () => {
	// let navigate = useNavigate();

	const validationSchema = Yup.object().shape({
		first_name: Yup.string().min(2, "El nombre debe tener al menos 2 caracteres").required("El nombre es obligatorio"),
		last_name: Yup.string().min(2, "El apellido debe tener al menos 2 caracteres").required("El apellido es obligatorio"),
		email: Yup.string().email("Formato de email inválido").required("El email es obligatorio"),
		password: Yup.string()
			.min(8, "La contraseña debe tener al menos 8 caracteres")
			.matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
			.matches(/[0-9]/, "Debe contener al menos un número")
			.matches(/[@$!%*?&]/, "Debe contener al menos un carácter especial (@$!%*?&)")
			.notOneOf([Yup.ref("first_name"), Yup.ref("last_name")], "No puede ser igual a tu nombre o apellido")
			.required("La contraseña es obligatoria")
	});

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
			<div className="col-md-6 col-lg-4">
				<Formik
					initialValues={{
						first_name: "",
						last_name: "",
						email: "",
						password: ""
					}}
					validationSchema={validationSchema}>
					{({ isSubmitting }) => (
						<Form className="form-container mx-auto w-50">
							<div className="input-container">
								<label className="form-label">Nombre</label>
								<Field type="text" className="form-control" name="first_name" />
								<ErrorMessage name="first_name" component="div" className="text-danger" />
							</div>
							<div className="input-container">
								<label className="form-label">Apellidos</label>
								<Field type="text" className="form-control" name="last_name" />
								<ErrorMessage name="last_name" component="div" className="text-danger" />
							</div>
							<div className="input-container">
								<label className="form-label">Email</label>
								<Field type="email" className="form-control" name="email" />
								<ErrorMessage name="email" component="div" className="text-danger" />
							</div>
							<div className="input-container">
								<label className="form-label">Contraseña</label>
								<Field type="password" className="form-control" name="password" />
								<ErrorMessage name="password" component="div" className="text-danger" />
							</div>
							<div className="input-container mt-4">
								<button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
									{isSubmitting ? "Registrando..." : "Crear cuenta"}
								</button>
								<hr />
								<button type="button" className="btn btn-secondary w-100 mb-2">
									Volver al inicio
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export const Loader = () => {
	return (
		<div className="d-flex flex-column align-items-center justify-content-center vh-100 vw-100">
			<div className="spinner-border text-primary mb-3" role="status" style={{ width: "5rem", height: "5rem" }}></div>
			<h2>Cargando...</h2>
		</div>
	);
};

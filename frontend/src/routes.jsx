import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Login } from "./pages/Login";
// import Home from "./pages/Home"; // puedes crearla si no existe aún

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} errorElement={<h1>Not Found!</h1>}>
			<Route index element={<Login />} />
			{/* <Route path="home" element={<Home />} /> */}
		</Route>
	)
);

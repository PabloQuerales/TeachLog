import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Login } from "./pages/Login";
import { Lobby } from "./pages/Lobby";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} errorElement={<h1>Not Found!</h1>}>
			<Route index element={<Login />} />
			<Route path="/lobby" element={<Lobby />} />
			<Route path="/students" element={<Lobby />} />
			<Route path="/registers" element={<Lobby />} />
			<Route path="/calender" element={<Lobby />} />
		</Route>
	)
);

import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { AppLayout } from "./layouts/AppLayout";
import { Login } from "./pages/Login";
import { Lobby } from "./pages/Lobby";
import { Students } from "./pages/Students";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<AuthLayout />} errorElement={<h1>Not Found!</h1>}>
				<Route index element={<Login />} />
			</Route>

			<Route element={<AppLayout />}>
				<Route path="/lobby" element={<Lobby />} />
				<Route path="/students" element={<Students />} />
				<Route path="/registers" element={<h2>Registers</h2>} />
				<Route path="/calender" element={<h2>Calendar</h2>} />
			</Route>
		</>
	)
);

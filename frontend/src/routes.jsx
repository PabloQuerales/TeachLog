import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { AppLayout } from "./layouts/AppLayout";
import { Login } from "./pages/Login";
import { Students } from "./pages/Students";
import { UserProfile } from "./pages/UserProfile";
import { AllRegisters } from "./pages/AllRegisters";
import { StudentDetails } from "./pages/StudentDetails";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<AuthLayout />} errorElement={<h1>Not Found!</h1>}>
				<Route index element={<Login />} />
			</Route>

			<Route element={<AppLayout />}>
				<Route path="/lobby" element={<UserProfile />} />
				<Route path="/students" element={<Students />} />
				<Route path="/registers" element={<AllRegisters />} />
				<Route path="/calender" element={<h2>Calendar</h2>} />
				<Route path="/student_details/:id" element={<StudentDetails />} />
			</Route>
		</>
	)
);

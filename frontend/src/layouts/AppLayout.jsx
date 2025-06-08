import { Sidebar } from "../components/sidebar";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
	return (
		<>
			<div className="d-flex vh-100 ">
				<Sidebar />
				<Outlet />
			</div>
		</>
	);
};

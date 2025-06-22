import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "../src/styles/App.css";

export default function App() {
	return <RouterProvider router={router} />;
}

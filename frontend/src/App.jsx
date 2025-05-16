// src/App.jsx
import { useEffect, useState } from "react";

function App() {
	const [message, setMessage] = useState("");

	useEffect(() => {
		fetch(`${import.meta.env.VITE_BACKEND_URL}/`)
			.then((res) => res.json())
			.then((data) => setMessage(data.message));
	}, []);

	return <h1>{message}</h1>;
}

export default App;

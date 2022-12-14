import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./pintpoint.css"
import { useEffect,useState } from "react"
import { getMe } from "../managers/authManager"
import { AdminViews } from "./views/AdminViews"
import { BartenderViews } from "./views/BartenderViews"


export const Pintpoint = () => {

	const [me, setMe] = useState({})

	useEffect(()=>{
		getMe().then(res => setMe(res))
	},[])


	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar me={me}/>
					{
						me[0]?.user?.is_staff
						? <AdminViews />
						: <BartenderViews />
					}
				</>
			</Authorized>

		} />
	</Routes>
}


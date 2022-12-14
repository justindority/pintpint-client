import { Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login.js"
import { Register } from "../auth/Register.js"
import { Tabs } from "../tabs/tabs.js"

export const BartenderViews = () => {
	return <>
	        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
			<Route path="/tabs" element={<Tabs />} />

            {/* <Route element={<Authorized />}>
                <Route path="/" element={<GameList />} /> */}
                {/* <Route path="/events" element={<EventList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/games/:gameId" element={<UpdateGameForm />} />
                <Route path="/events/:eventId" element={<UpdateEventForm />} /> */}

            {/* </Route> */}
        </Routes>
	</>
}


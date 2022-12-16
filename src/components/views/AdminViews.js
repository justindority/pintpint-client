import { Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login.js"
import { Register } from "../auth/Register.js"
import { Employees } from "../employees/employee.js"
import { Items } from "../items/items.js"
import { ItemManager } from "../items/item_manager.js"
import { Reports } from "../reports/reports.js"
import { Tabs } from "../tabs/tabs.js"

export const AdminViews = () => {
	return <>
	        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
			<Route path="/tabs" element={<Tabs />} />
            <Route path="/items" element={<ItemManager />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/reports" element={<Reports />} />


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


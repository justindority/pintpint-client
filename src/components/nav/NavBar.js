import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({me}) => {
    const navigate = useNavigate()
    
    

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="tabs" onClick={() => {
                    navigate("/tabs")
                }}>Tabs</Link>
            </li>
            {
                me[0]?.user?.is_staff
                ? (
                    <>
                    <Link className="navbar__link" to="items" onClick={() => {
                        navigate("/items")
                    }}>Items</Link>
                    <Link className="navbar__link" to="employees" onClick={() => {
                        navigate("/employees")
                    }}>Employees</Link>
                    <Link className="navbar__link" to="reports" onClick={() => {
                        navigate("/reports")
                    }}>Reports</Link>
                    </>
                )
                : (
                    <>clock in clock out</>
                )
            }

            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("pintpoint_token")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}


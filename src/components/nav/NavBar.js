import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getMe } from "../../managers/authManager"
import "./NavBar.css"

export const NavBar = ({me}) => {
    const navigate = useNavigate()
    const [myself, setMyself] = useState()
    const [finishedLoading, setFinishedLoading] = useState(false)


	useEffect(()=>{
        setMyself(null)
		getMe().then(res => setMyself(res))
	},[])

    useEffect(()=>{
        if(myself){
            setFinishedLoading(true)
        }
    },[myself])
    
    if(myself && finishedLoading){
    

    return (<>

        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="tabs" onClick={() => {
                    navigate("/tabs")
                }}>Tabs</Link>
            </li>
            {
                myself?.user?.is_staff
                ? (
                    <>
                    <Link className="navbar__link" to="items" onClick={() => {
                        navigate("/items")
                    }}>Items</Link> &nbsp;&nbsp;
                    <Link className="navbar__link" to="employees" onClick={() => {
                        navigate("/employees")
                    }}>Employees</Link> &nbsp;&nbsp;
                    <Link className="navbar__link" to="reports" onClick={() => {
                        navigate("/reports")
                    }}>Reports</Link>&nbsp;
                    </>
                )
                : (
                    <></>
                )
            }

            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("pintpoint_token")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul></>
    )
}

}
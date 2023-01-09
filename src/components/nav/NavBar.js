import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getMe } from "../../managers/authManager"
import "./NavBar.css"
import { default as logo } from "./logo2.png";

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
                <img class="navbar-logo" src={logo}/>
            </li>
            <li className="navbar__item">
                <h5 className="navbar__link hover-underline-animation" to="tabs" onClick={() => {
                    navigate("/tabs")
                }}>Tabs</h5>
            </li>
            {
                myself?.user?.is_staff
                ? (
                    <>
                    <li className="navbar__item">
                    <h5 className="navbar__link hover-underline-animation" to="items" onClick={() => {
                        navigate("/items")
                    }}>Items</h5> 
                    </li>
                    <li className="navbar__item">
                    <h5 className="navbar__link hover-underline-animation" to="employees" onClick={() => {
                        navigate("/employees")
                    }}>Employees</h5>
                    </li>
                    <li className="navbar__item">
                    <h5 className="navbar__link hover-underline-animation" to="reports" onClick={() => {
                        navigate("/reports")
                    }}>Reports</h5>
                    </li>
                    </>
                )
                : (
                    <></>
                )
            }

            <li className="navbar__item navbar__logout">
                <h5 className="navbar__link hover-underline-animation" to="" onClick={() => {
                    localStorage.removeItem("pintpoint_token")
                    navigate("/", {replace: true})
                }}>Logout</h5>
            </li>
        </ul></>
    )
}

}
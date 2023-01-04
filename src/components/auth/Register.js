import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        isStaff: false,
        hourlyRate: 0,
        username: "",
        password: ""
    })
    let navigate = useNavigate()

    const registerNewUser = (event) => {
        event.preventDefault()
        return fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(token => {
                if (token.token) {
                    localStorage.setItem("pintpoint_token",token.token)

                    navigate("/tabs")
                } else if('False' in token) {
                    window.alert('')
                }})
            
    }


    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={registerNewUser}>
                <h1 className="h3 mb-3 font-weight-normal">register an employee for pintpoint</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={updateUser}
                           type="text" id="firstName" className="form-control"
                           placeholder="First Name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={updateUser}
                           type="text" id="lastName" className="form-control"
                           placeholder="Last Name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Username </label>
                    <input onChange={updateUser}
                        type="text" id="username" className="form-control"
                        placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateUser}
                        type="password" id="password" className="form-control"
                        placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="hourlyRate"> Hourly Rate </label>
                    <input onChange={updateUser}
                        type="number" id="hourlyRate" className="form-control"
                        placeholder="Hourly Rate" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...user}
                        copy.isStaff = evt.target.checked
                        setUser(copy)
                    }}
                        type="checkbox" id="isStaff" />
                    <label htmlFor="email"> This employee is an administrator </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}


import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPass] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        let body = {
            username: username,
            password: password
        }
        return fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(token => {
                if (token.token) {
                    localStorage.setItem("pintpoint_token",token.token)

                    navigate("/tabs")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>pintpoint</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> username </label>
                        <input type="text"
                            value={username}
                            onChange={evt => setUsername(evt.target.value)}
                            className="form-control"
                            placeholder="username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputEmail">password</label>
                        <input type="password"
                            value={password}
                            onChange={evt => setPass(evt.target.value)}
                            className="form-control"
                            placeholder="password"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button onClick={handleLogin} type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            {/* <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section> */}
        </main>
    )
}


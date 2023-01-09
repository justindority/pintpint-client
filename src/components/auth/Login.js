import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"
import {Button, InputGroup, InputGroupText, Input} from 'reactstrap'
import { default as logo } from "./logo2.png";


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
            <section className="login-section">

                    <img className="login-logo" src={logo}></img>
                 
                    <InputGroup className="input-username">
                        <InputGroupText htmlFor="input-username"> username </InputGroupText>
                        <Input type="text"
                            value={username}
                            onChange={evt => setUsername(evt.target.value)}
                            className="input-username"
                            placeholder="username"
                            required autoFocus />
                    </InputGroup>
                        <br/>
                        <InputGroup className="input-password">
                        <InputGroupText htmlFor="input-password">password</InputGroupText>
                        <Input type="password"
                            value={password}
                            onChange={evt => setPass(evt.target.value)}
                            className="form-control"
                            placeholder="password"
                            required autoFocus />
                            </InputGroup>
                        
                        <br/>
                        <Button color='primary' onClick={handleLogin} type="submit">
                            Sign in
                        </Button>
                        
                    

            </section>
            {/* <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section> */}
        </main>
    )
}


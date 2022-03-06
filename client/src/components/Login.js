import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login({handleSetUser}) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [loggedIn, setLoggedIn] = useState(false)
    
    function handleInputChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleLogin() {
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', accept: 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(handleSetUser)
        .then(() => setLoggedIn(true))
    }

    
    if (loggedIn) return <Navigate replace to="/"/> 

    return (
        <div>
            <h1>Log In</h1>
            <table>
                <tr>
                    <td>
                        <label>Email: </label>
                    </td>
                    <td>
                        <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Password: </label>
                    </td>
                    <td>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                    </td>
                </tr>
            </table>
            <div>
                <input type="checkbox" name="remember-me"/>
                <label>Remember me</label>
            </div>
            <button onClick={handleLogin}>Log in</button>
            <br/>
            <Link to="/signup">Sign Up</Link>
            <br/>
            <Link to="/forgot-password">Forgot your password?</Link>
        </div>
    )
}
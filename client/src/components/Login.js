import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import '../App.css'

export default function Login({handleLogIn, loggedIn}) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // const [loggedIn, setLoggedIn] = useState(false)
    
    function handleInputChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    if (loggedIn) return <Navigate replace to="/"/> 

    return (
        <div className="container">
            <h1>Log In</h1>
            <table className="form">
                <tr>
                    <td className="form-label">
                        <label >Email: </label>
                    </td>
                    <td>
                        <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
                    </td>
                </tr>
                <tr>
                    <td className="form-label">
                        <label>Password: </label>
                    </td>
                    <td>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                    </td>
                </tr>
            </table>
            <button className="submit-button" onClick={() => handleLogIn(formData)}>Log in</button>
            <Link className="submit-button" to="/signup">Sign Up</Link>
            <br/>
            <Link to="/forgot-password">Forgot your password?</Link>
        </div>
    )
}
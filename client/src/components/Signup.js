import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
export default function Signup({ handleSetUser }) {
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const [ loggedIn, setLoggedIn ] = useState(false)

    function handleUpdateForm(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleCreateUser(user) {
        fetch('/users', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(handleSetUser)
        .then(() => {
            setLoggedIn(true)
            alert('Account created!')
        })
        .catch(() => alert('There was a problem creating the user.'))   
    }

    if (loggedIn) {
        return <Navigate replace to="/" />
    }

    return (
        <div className="container">
            <h1>Sign up</h1>
            <table className="form">
                <tr className="form-label">Name</tr>
                <tr><input name="name" value={formData.name} onChange={handleUpdateForm}/></tr>
                <tr className="form-label">Email</tr>
                <tr><input name="email" value={formData.email} onChange={handleUpdateForm}/></tr>
                <tr className="form-label">Password (Min. 6 characters)</tr>
                <tr><input type="password" name="password" value={formData.password} onChange={handleUpdateForm}/></tr>
                <tr className="form-label">Confirm password</tr>
                <tr><input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleUpdateForm}/></tr>
            </table>
            <button className="submit-button" onClick={() => {
                    handleCreateUser(formData)
            }}>Sign Up</button>
            
            <Link className="submit-button" to="/login">Log In</Link>
        </div>
    )
}
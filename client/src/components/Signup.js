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
        <>
        <h1>Sign up</h1>

        <label>Name</label>
        <br />
        <input name="name" value={formData.name} onChange={handleUpdateForm}/>
        <br/>
        <label>Email</label>
        <br />
        <input name="email" value={formData.email} onChange={handleUpdateForm}/>
        <br/>
        <label>Password (Min. 6 characters)</label>
        <br />
        <input type="password" name="password" value={formData.password} onChange={handleUpdateForm}/>
        <br/>
        <label>Confirm password</label>
        <br />
        <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleUpdateForm}/>
        <br />
        <button onClick={() => {
            handleCreateUser(formData)
        }}>Sign Up</button>
        <br/>
        <Link to="/login">Log In</Link>
        </>
    )
}
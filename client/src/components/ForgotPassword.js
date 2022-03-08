import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
export default function ForgotPassword({handlePasswordReset, handleSetUser}) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [loggedIn, setLoggedIn] = useState(false)
    
    function handleUpdateForm(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    if (loggedIn) return <Navigate replace to="/" />


    function handlePasswordReset(user) {
        fetch('/password-reset', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify(user)
          })
        .then(res => res.json())
        .then(handleSetUser)
        .then(() => {
            setLoggedIn(true)
            alert('Password updated!')
        })
        .catch(() => alert('There was a problem update the password.'))   
    }

    return (
        <>
        <h1>Password Reset</h1>
        <label>Email</label>
        <br />
        <input name="email" value={formData.email} onChange={handleUpdateForm}/>
        <br/>
        <label>New password (Min. 6 characters)</label>
        <br />
        <input type="password" name="password" value={formData.password} onChange={handleUpdateForm}/>
        <br/>
        <label>Confirm password</label>
        <br />
        <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleUpdateForm}/>
        <br />
        <button onClick={() => handlePasswordReset(formData)}>Reset</button>
        </>
    )
}
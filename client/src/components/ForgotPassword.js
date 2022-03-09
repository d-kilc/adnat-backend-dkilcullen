import { useState  } from 'react'
import { Navigate } from 'react-router-dom'
export default function ForgotPassword({handlePasswordReset, loggedIn}) {
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: ''
    })
    
    function handleUpdateForm(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    if (loggedIn) return <Navigate replace to="/" />

    return (
        <div className="container">
        <h1>Password Reset</h1>
        <table className="form">
            <tr className="form-label">
                <label>Email</label>
            </tr>
            <tr className="form-label">
                <input name="email" value={formData.email} onChange={handleUpdateForm}/>
            </tr>
            <tr className="form-label">
                <label>New password (Min. 6 characters)</label>
            </tr>
            <tr className="form-label">
                <input type="password" name="password" value={formData.password} onChange={handleUpdateForm}/>
            </tr>
            <tr className="form-label">
                <label>Confirm password</label>
            </tr>
            <tr className="form-label">
                <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleUpdateForm}/>
            </tr>
        </table>
        <button className="submit-button" onClick={() => handlePasswordReset(formData)}>Reset</button>
        </div>
    )
}
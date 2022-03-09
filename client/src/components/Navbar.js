import '../App.css'
import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'


export default function Navbar({user, handleLogOut}) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(false)
    }, [user])
    
    const navigate = useNavigate()

    function goBack() {
      navigate(-1)
    }

    if (user && !loading) return (
        <div id="nav">
            <div className="nav-section">
                {user.name !== "unauthorized" ? <button onClick={goBack} id="back">Back</button> : <></> }
                <div id="nav-brand">Adnat</div>
            </div>
            {user.name !== "unauthorized" ? (
            <div id="sub-menu">
                <Link className="nav-link" to="/">{user.name}</Link>
                <Link className="nav-link" to="/" onClick={handleLogOut}>Sign out</Link> 
            </div>
            ) : (
                <></>
            )}
        </div>
    )
    else return <></>
}
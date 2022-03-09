import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import '../App.css'

export default function JoinOrg({ user, handleLogOut, handleCreateOrganisation, handleJoinOrganisation}) {
    const [loading, setLoading] = useState(true)
    const [organisations, setOrganisations] = useState([])
    const [newOrg, setNewOrg] = useState({name: "", hourly_rate: 0})
        
    useEffect(fetchOrganisations, [])

    useEffect(() => setLoading(false), [user])

    function handleSetNewOrg(e) {
        setNewOrg({...newOrg, [e.target.name]: e.target.value})
    }

    function fetchOrganisations() {
        fetch('/organisations')
        .then(res => res.json())
        .then(setOrganisations)
    }

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    else {
        return (
            <div className="container">
                <p>You aren't a member of any organisations. Join an existing one or create a new one.</p>
                <h2>Organisations:</h2>
                <div className="organisation-chart">
                    {organisations.map(org => {
                        return (
                            <div key={org.id} className="dashboard-headline">
                                <div className="org-control">{org.name}</div>
                                <Link className="submit-button" to={"/edit"} state={{organisation: org}}>Edit</Link>
                                <Link className="submit-button" to={"/"} onClick={() => handleJoinOrganisation(org)}>Join</Link>
                            </div>
                        )
                    })}
                </div>
                <h2>Create organisation:</h2>
                <table className="form">
                    <tr>
                        <td className="form-label">
                            <label>Name: </label>
                        </td>
                        <td>
                            <input type="text" name="name" onChange={handleSetNewOrg}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="form-label">
                            <label>Hourly rate: $</label>
                        </td>
                        <td>
                            <input type="number" name="hourly_rate" onChange={handleSetNewOrg}/>
                        </td>
                    </tr>
                </table>
                <button className="submit-button" onClick={() => handleCreateOrganisation(newOrg)}>Create and Join</button>
            </div>
        ) 
    }

}
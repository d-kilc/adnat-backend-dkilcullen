import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

export default function JoinOrg({ user, handleLogOut, handleCreateOrganisation, handleJoinOrganisation}) {
    const [loading, setLoading] = useState(true)
    const [organisations, setOrganisations] = useState([])
    const [newOrg, setNewOrg] = useState({name: "", hourly_rate: 0})


    function handleSetNewOrg(e) {
        setNewOrg({...newOrg, [e.target.name]: e.target.value})
    }
    
    useEffect(() => {
        fetch('/organisations')
        .then(res => res.json())
        .then(setOrganisations)
    }, [])

    useEffect(() => {
        setLoading(false)
    }, [user])

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    else {
        return (
            <>
            <h1>Dashboard</h1>
            <p>{`Logged in as ${user && user.name}`}</p>
            <button onClick={handleLogOut}>Log Out</button>
            <p>You aren't a member of any organisations. Join an existing one or create a new one.</p>
            <h2>Organisations:</h2>
            <div>
                {organisations.map(org => {
                    return (
                        <div>
                            <div>{org.name}</div>
                            <Link to={"/edit"} state={{organisation: org}}>Edit</Link>
                            <button onClick={() => handleJoinOrganisation(org)}>
                                Join
                            </button>
                        </div>

                    )
                })}
            </div>
            <h2>Create organisation</h2>
            <table>
                    <tr>
                        <td>
                            <label>Name: </label>
                        </td>
                        <td>
                            <input type="text" name="name" onChange={handleSetNewOrg}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Hourly rate: $</label>
                        </td>
                        <td>
                            <input type="number" name="hourly_rate" onChange={handleSetNewOrg}/>
                        </td>
                    </tr>
                </table>
                <button onClick={() => handleCreateOrganisation(newOrg)}>Create and Join</button>
            </>
        ) 
    }

}
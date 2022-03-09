import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

export default function Edit({handleSaveOrganisation}) {
    
    const { state } = useLocation()
    const [organisation, setOrganisation] = useState(state.organisation)
    const navigate = useNavigate()

    function handleUpdateOrganisation(e) {
        setOrganisation({...organisation, [e.target.name]: e.target.value})
    }

    return(
        <div className="container">
            <h1>Edit Organisation</h1>
            <table className="form">
                <tr>
                    <td className="form-label">Name: </td>
                    <td>
                        <input value={organisation.name} name="name" onChange={handleUpdateOrganisation}/>
                    </td>
                </tr>
                <tr>
                    <td className="form-label">Hourly Rate: $</td>
                    <td>
                        <input value={organisation.hourly_rate} name="hourly_rate" onChange={handleUpdateOrganisation}/>
                    </td>
                </tr>
            </table>
            <button className="submit-button" onClick={() => {
                handleSaveOrganisation(organisation)
                navigate('/')
            }}>Update and Join</button>
            {/* <button onClick={() => {
                handleDeleteOrganisation(organisation.id)
                navigate('/')
            }}>Delete Organisation</button> */}
        </div>
    )
}
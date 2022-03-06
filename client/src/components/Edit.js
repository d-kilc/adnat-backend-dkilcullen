import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

export default function Edit({handleSaveOrganisation, handleDeleteOrganisation}) {
    const { state } = useLocation()
    const [organisation, setOrganisation] = useState(state.organisation)
    const navigate = useNavigate()
    console.log(organisation)
    function handleUpdateOrganisation(e) {
        setOrganisation({...organisation, [e.target.name]: e.target.value})
    }

    return(
        <div>
            <h1>Edit Organisation</h1>
            <table>
                <tr>
                    <td>Name: </td>
                    <td>
                        <input value={organisation.name} name="name" onChange={handleUpdateOrganisation}/>
                    </td>
                </tr>
                <tr>
                    <td>Hourly Rate: $</td>
                    <td>
                        <input value={organisation.hourly_rate} name="hourly_rate" onChange={handleUpdateOrganisation}/> per hour
                    </td>
                </tr>
            </table>
            <button onClick={() => {
                handleSaveOrganisation(organisation)
                navigate('/')
            }}>Update</button>
            <br/>
            <button onClick={() => {
                handleDeleteOrganisation(organisation.id)
                navigate('/')
            }}>Delete Organisation</button>
        </div>
    )
}
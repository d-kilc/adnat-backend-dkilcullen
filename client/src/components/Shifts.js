import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Shifts({ user, handlePostShift }) {

    const { state } = useLocation()
    const [shifts, setShifts] = useState()
    const [newShift, setNewShift] = useState({
        date: new Date(),
        startTime: '', 
        endTime: '', 
        breakLength: 0,
        user_id: 0,
    })

    useEffect(() => {
        fetch(`/organisations/${state.organisation_id}`)
        .then(res => {
            if (res.ok) {
                res.json()
                .then(data => setShifts(data.shifts))
            }
        })
    }, [user])
    
    console.log(user)

    useEffect(() => {
        if (user) setNewShift({...newShift, user_id: user.id})
    }, [user])

    function handleUpdateNewShift(e) {
        if (e.target.name === 'date') {
            setNewShift({
                ...newShift,
                date: new Date( e.target.value ),
            })        
        } else {
            setNewShift({...newShift, [e.target.name]: e.target.value})
        }    
    }

    if (shifts && user) {
        return(
            <>
            <h1>Shifts</h1>
            <table>
               <thead>
                    <tr>
                        <td>Employee name</td>
                        <td>Date</td>
                        <td>Start time</td>
                        <td>Finish time</td>
                        <td>Break length (min.)</td>
                        <td>Hours worked</td>
                        <td>Shift cost</td>
                    </tr>
                </thead>
                <tbody>

                {user.organisation && shifts.map(shift => {
                    const shiftStart = new Date(shift.start)
                    const shiftEnd = new Date(shift.end)
    
                    const hoursWorked = ((shiftEnd - shiftStart)/3600000 - (shift.break_length / 60)).toFixed(2)
                    const shiftCost = `$${(hoursWorked * user.organisation.hourly_rate).toFixed(2)}`
    
                    return (
                        <tr>
                            <td>{shift.username}</td>
                            <td>{`${shiftStart.getMonth()+1}/${shiftStart.getDate()}/${shiftStart.getFullYear()}`}</td>
                            <td>{shiftStart.toLocaleTimeString()}</td>
                            <td>{shiftEnd.toLocaleTimeString()}</td>
                            <td>{shift.break_length}</td>
                            <td>{hoursWorked}</td>
                            <td>{shiftCost}</td>
                        </tr>
                    )
                })}
                <tr>
                    <td>{user && user.name}</td>
                    <td><input type="date" name="date" value={newShift.date.toLocaleDateString('en-GB').split('/').reverse().join('-')} onChange={handleUpdateNewShift}/></td>
                    <td><input type="time" name="startTime" value={newShift.startTime} onChange={handleUpdateNewShift}/></td>
                    <td><input type="time" name="endTime" value={newShift.endTime} onChange={handleUpdateNewShift}/></td>
                    <td><input type="number" name="breakLength" value={newShift.breakLength} onChange={handleUpdateNewShift}/></td>
                    <td colSpan="2">
                        <button onClick={() => handlePostShift(newShift)}>Create shift</button>
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>
            </>
        )
    } else {
        return <div>Loading...</div>
    }

}
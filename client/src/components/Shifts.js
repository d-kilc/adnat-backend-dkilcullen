import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Shifts({ user }) {
    const { state } = useLocation()
    const [shifts, setShifts] = useState()
    console.log(state)
    useEffect(() => {
        fetch(`/organisations/${state.organisation_id}/shifts`)
        .then(res => {
            if (res.ok) {
                res.json().then(setShifts)
            }
        })
    }, [])

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
            {shifts && shifts.map(shift => {
                const shiftStart = new Date(shift.start)
                const shiftEnd = new Date(shift.end)

                const hoursWorked = ((shiftEnd - shiftStart)/3600000 - (shift.break_length / 60)).toFixed(2)
                const shiftCost = `$${(hoursWorked * shift.organisation.hourly_rate).toFixed(2)}`


                return (
                    <tr>
                        <td>{shift.user.name}</td>
                        <td>{`${shiftStart.getMonth()}/${shiftStart.getDate()}/${shiftStart.getFullYear()}`}</td>
                        <td>{shiftStart.toLocaleTimeString()}</td>
                        <td>{shiftEnd.toLocaleTimeString()}</td>
                        <td>{shift.break_length}</td>
                        <td>{hoursWorked}</td>
                        <td>{shiftCost}</td>
                    </tr>
                )
            })}
            <tr>
                <td>{user.name}</td>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>
            </tr>
            </tbody>
        </table>
        </>
    )
}
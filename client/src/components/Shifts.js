import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { TextField, Typography, Button, Table, TableBody, TableHead, TableRow, TableCell, Grid } from '@mui/material'
import { DateTime } from "luxon"
import '../App.css'

export default function Shifts({ user, handlePostShift, handleDeleteShift }) {

    const { state } = useLocation()
    const [shifts, setShifts] = useState()

    const [filterText, setFilterText] = useState('')
    const [filteredShifts, setFilteredShifts] = useState()

    const [loading, setLoading] = useState(true)
    const [newShift, setNewShift] = useState({
        date: new Date( ),
        startTime: '', 
        endTime: '', 
        breakLength: 0,
        user_id: 0,
    })

    useEffect(() => {
        setLoading(false)
    }, [shifts])

    useEffect(() => {
        fetch(`/organisations/${state.organisation_id}`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setShifts(formatShifts(data.shifts))
                    setFilteredShifts(formatShifts(data.shifts))
                })
            }
        })
    }, [user])

    useEffect(() => {
        if (user) setNewShift({...newShift, user_id: user.id})
    }, [user])
    
    function formatShifts(shifts) {
        return shifts.map(shift => {
            return ({
                ...shift,
                start: DateTime.fromJSDate(new Date(shift.start)).setZone('America/Chicago'),
                end: DateTime.fromJSDate(new Date(shift.end)).setZone('America/Chicago')
            })
        })
    }
    
    function handleUpdateNewShift(e) {
        
        if (e.target.name === 'date') {
            setNewShift({
                ...newShift,
                date: new Date( e.target.value.replace('-','/') ),
            })        
        } else {
            setNewShift({...newShift, [e.target.name]: e.target.value})
        }    
    }

    useEffect(() => {
        if (!shifts) return
        const filtered = shifts.filter(shift => {
            return shift.username.toLowerCase().includes( filterText.toLowerCase() )
        })
        setFilteredShifts(filtered)
    }, [filterText])

    if (!user) return <></>
    
    if(!loading && user) {

        const shiftsSorted = filteredShifts && filteredShifts.sort((a, b) => (a.start > b.start) ? -1 : 1 )

        const shiftRows = shiftsSorted && shiftsSorted.map(shift => {
            const shiftStart = DateTime.fromJSDate(new Date(shift.start)).setZone('America/Chicago')
            const shiftEnd = DateTime.fromJSDate(new Date(shift.end)).setZone('America/Chicago')

            const hoursWorked = ((shiftEnd - shiftStart)/3600000 - (shift.break_length / 60)).toFixed(2)
            const shiftCost = `$${(hoursWorked * user.organisation.hourly_rate).toFixed(2)}`

            const deleter = shift.user_id === user.id ? (
                <Button color="warning" onClick={() => handleDeleteShift(shift)} variant="contained">x</Button>
            ) : <></>

            return (
                <TableRow>
                    <TableCell className="table-data">{shift.username}</TableCell>
                    <TableCell className="table-data">{shiftStart.toLocaleString()}</TableCell>
                    <TableCell className="table-data">{shiftStart.plus({hours: 1}).toLocaleString(DateTime.TIME_SIMPLE)}</TableCell>
                    <TableCell className="table-data">{shiftEnd.plus({hours: 1}).toLocaleString(DateTime.TIME_SIMPLE)}</TableCell>
                    <TableCell className="table-data">{shift.break_length}</TableCell>
                    <TableCell className="table-data">{hoursWorked}</TableCell>
                    <TableCell className="table-data">{shiftCost}</TableCell>
                    <TableCell>{deleter}</TableCell>
                </TableRow>
            )
        })

        return(
            <div>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Typography variant="h4" my={4} ml={2}>Shift Management</Typography>
                    <TextField sx={{marginRight: '16px'}} label="Filter by employee" value={filterText} onChange={(e) => setFilterText(e.target.value)}/>
                </Grid>
                <Typography variant="h5" my={3} ml={2}>{user.organisation.name}</Typography>
                <Table className="table-data" sx={{margin: 'auto', width: '90%'}}>
                    <TableHead >
                        <TableRow className="table-data">
                            <TableCell className="table-data" sx={{fontWeight: 'bold'}}>Employee name</TableCell>
                            <TableCell className="table-data" sx={{fontWeight: 'bold'}}>Date</TableCell>
                            <TableCell className="table-data" sx={{fontWeight: 'bold'}}>Start time</TableCell>
                            <TableCell className="table-data" sx={{fontWeight: 'bold'}}>Finish time</TableCell>
                            <TableCell className="table-data" sx={{fontWeight: 'bold'}}>Break length (minutes)</TableCell>
                            <TableCell className="table-data" sx={{fontWeight: 'bold'}}>Hours worked</TableCell>
                            <TableCell className="table-data" sx={{fontWeight: 'bold'}}>Shift cost</TableCell>
                            <TableCell className="table-data" sx={{fontWeight: 'bold'}}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shiftRows}
                        <TableRow>
                            <TableCell className="table-data">{user && user.name}</TableCell>
                            <TableCell className="table-data">
                                <TextField type="date" name="date" value={newShift.date.toLocaleDateString('en-CA')} onChange={handleUpdateNewShift}/>
                            </TableCell>
                            <TableCell className="table-data">
                                <TextField type="time" name="startTime" value={newShift.startTime} onChange={handleUpdateNewShift}/>
                            </TableCell>
                            <TableCell className="table-data">
                                <TextField type="time" name="endTime" value={newShift.endTime} onChange={handleUpdateNewShift}/>
                            </TableCell>
                            <TableCell className="table-data">
                                <TextField type="number" name="breakLength" value={newShift.breakLength} onChange={handleUpdateNewShift}/>
                            </TableCell>
                            <TableCell colSpan="3" className="table-data">
                                <Button variant="contained" onClick={() => handlePostShift(newShift)}>Create shift</Button>
                            </TableCell>
                            
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }  else {
        return <></>
    }

}
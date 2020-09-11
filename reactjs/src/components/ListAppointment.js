import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    width: 200
  },
});

export default function ListAppointment() {
  const classes = useStyles(); 

  const [appointments, setAppointments] = useState([]);
  
  // useEffect(() => {
  //   fetch('http://localhost:8080/api/appointments')
  //   .then((response) => response.json()) // Transform the data into json
  //   .then(function(data) {
  //       setAppointments(data["data"])
  //       console.log(data)
  //     });
  // }, [])
  useEffect(() => {
      getAllAppoints();
    }, [])

  function getAllAppoints(){
    fetch('http://localhost:8080/api/appointments')
    .then((response) => response.json()) // Transform the data into json
    .then(function(data) {
        setAppointments(data["data"])
        // console.log(data)
      });
  }

  function deleteAppointment(appointmentId){
    // alert(appointmentId)
    let reqBody = {
      id: appointmentId,
    }

    let fetchData = { 
      method: 'DELETE', 
      body: JSON.stringify(reqBody),
      headers: {
      'Content-Type': 'application/json'
      },
    }

    fetch('http://localhost:8080/api/appointments/', fetchData)
    .then(response => response.json())
    .then(data => {
        // console.log('Sucess: Record Deleted', )
        getAllAppoints()
      ;
    })
    .catch((error) => {
      alert('Error:'+ error);
    });
  }

  return (
    <TableContainer align="center" component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell align="right">{appointment.name}</TableCell>
              <TableCell align="right">{appointment.date_alias}</TableCell>
              <TableCell align="right">{appointment.time_alias}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete" onClick={deleteAppointment.bind(this, appointment.id)} >
                  <DeleteIcon />
                </IconButton>
              </TableCell>

            </TableRow>
           
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


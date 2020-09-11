import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: 300,
  },
}));

export default function AddAppointment() {
  const classes = useStyles(); 
  const nowStr = new Date().toISOString().slice(0,10);

  const [name, setName] = useState('');
  const [inputError, setInputError] = useState(false);
  const [date, setDate] = useState(nowStr);
  const [time, setTime] = useState('00:00:00');
  
  const handleNameChange = event => setName(event.target.value)
  const handleDateChange = event => setDate(event.target.value)
  const handleTimeChange = event => setTime(event.target.value + ":00")
  // const today = new Date()
  
  const saveAppointment = event => {
    // console.log("Name: " + name + " Date: " + date +  " time: " + time)
    event.preventDefault();

    let fullDateStr = date + " " + time; 
    let fullDate = new Date(fullDateStr); 
    let now = new Date();
    // console.log(now)
    if (fullDate > now){
      setInputError(false);

      let data = {
          name: name,
          dt: fullDateStr,
          
        }
    
        let fetchData = { 
          method: 'POST', 
          body: JSON.stringify(data),
          headers: {
          'Content-Type': 'application/json'
          },
        }
    
        fetch('http://localhost:8080/api/appointments/', fetchData)
        .then(response => response.json())
        .then(data => {
          if (data.message === "Duplicate"){ 
            alert('Timing Conflict') 
            // console.log('Timing Conflict :', data.message)
          }else{
            alert('Data Inserted')
            // console.log('Sucess:', data.message)
          };
        })
        .catch((error) => {
          alert('Error:'+ error);
        });
      }else{
        setInputError(true);
        // alert('Input Error')
      }

  }

  return (
    <div style={{ display: "grid", justifyContent: "center", }}>
      <form className={classes.container} onSubmit={saveAppointment}>
        <TextField
          label="Name"
          required
          type="text"
          className={classes.textField}
          onChange={handleNameChange}
          variant="filled"
        />
        <TextField
          label="Date"
          type="date"
          defaultValue={nowStr}
          className={classes.textField}
          onChange={handleDateChange}
          variant="filled"
          error={inputError}
          helperText={inputError ? 'Future Date / Time' : ' '}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Time"
          type="time"
          className={classes.textField}
          onChange={handleTimeChange} 
          variant="filled"
          defaultValue={time}

          error={inputError}
          helperText={inputError ? 'Future Date / Time' : ' '}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type="text"
          className={classes.textField}
          variant="filled"
          disabled
          value={date}
        />
        <TextField
          type="text"
          className={classes.textField}
          variant="filled"
          disabled
          value={time}
        />
        <br/>
        <Button type="submit" variant="contained" color="primary">Save</Button><br/>
      </form>
    </div>

  );
}

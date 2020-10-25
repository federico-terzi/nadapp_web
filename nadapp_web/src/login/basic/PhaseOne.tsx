import { Box, Button, Link, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { basicLoginRequested } from '../../store/auth';

const useStyles = makeStyles({
  root: {},
  button: {
    minWidth: 150,
  }
})

function PhaseOne() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className={classes.root}>
      <p>Inserisci le tue credenziali IICB:</p>
      <TextField label="Username" variant="outlined" value={username} onChange={e => setUsername(e.target.value)}/>
      <Box m={1} />
      <TextField label="Password" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      <Box m={1} />
      <Button className={classes.button} variant="contained" color="primary" onClick={() => {
        dispatch(basicLoginRequested({
          username,
          password,
        }))
      }}>
        Accedi
      </Button>
      <Box m={2} />
    </div>
  );
}

export default PhaseOne


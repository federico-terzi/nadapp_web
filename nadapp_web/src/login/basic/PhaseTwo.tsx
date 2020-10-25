import { Box, Button, Link, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { basicLoginRequested, basicLoginVerifyRequested } from '../../store/auth';

const useStyles = makeStyles({
  root: {},
  button: {
    minWidth: 150,
  }
})

function PhaseTwo() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [code, setCode] = useState("")

  return (
    <div className={classes.root}>
      <p>Inserisci il codice di verifica ricevuto via SMS:</p>
      <TextField label="Codice" variant="outlined" value={code} onChange={e => setCode(e.target.value)}/>
      <Box m={1} />
      <Button className={classes.button} variant="contained" color="primary" onClick={() => {
        dispatch(basicLoginVerifyRequested({
          code: code.trim(),
        }))
      }}>
        Accedi
      </Button>
      <Box m={2} />
    </div>
  );
}

export default PhaseTwo


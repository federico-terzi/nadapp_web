import { Box, Button, Link } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestSpidLogin } from '../store/auth';
import { RootState } from '../store/root';
import BasicLoginPanel from './basic/BasicLoginPanel';

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  contentBox: {
    textAlign: "center",
    width: 400,
    padding: 20,
  },
  logo: {
    height: 100,
  },
  button: {
    margin: 10,
  }
})

type Section = "select_method" | "basic_login"

function LoginPanel() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [section, setSection] = useState<Section>("select_method")
  const loginError = useSelector<RootState, string | null>(state => state.auth.error)

  // Check whether a SPID token is present in the URL
  if (window.location.href.includes("/login?spidToken")) {
    const urlParams = new URLSearchParams(window.location.search)
    const spidToken = urlParams.get('spidToken')
    if (spidToken) {
      dispatch(requestSpidLogin(spidToken))
    } else {
      console.log("Token non valido")
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.contentBox} elevation={3}>
        <img src="/logo.png" className={classes.logo} />
        <h1>Accedi</h1>
        {loginError &&
          <Alert severity="error">{loginError}</Alert>
        }
        {section === "select_method" &&
          <Box>
            <p>Seleziona la modalità di accesso:</p>
            <Button className={classes.button} variant="contained" color="primary"
              onClick={() => {
                setSection("basic_login")
              }}
            >
              Accesso con Credenziali IICB
            </Button>
            <Button className={classes.button} variant="contained" color="primary"
              onClick={() => {
                window.location.href = "http://nadappserver:8000/spid/login?entityID=xx_testenv2"
              }}
            >
              Accesso con SPID
            </Button>
          </Box>
        }
        {section === "basic_login" &&
          <Box>
            <BasicLoginPanel />

            <Link href="#" onClick={() => {
              setSection("select_method")
            }}>Torna ai metodi d'accesso</Link>
          </Box>
        }
      </Paper>
    </div>
  );
}

export default LoginPanel


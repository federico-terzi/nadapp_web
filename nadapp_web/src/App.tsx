import React from 'react';
import LoginPanel from './login/LoginPanel';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { Redirect, Route, Router, Switch } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
})

function App() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/">
            <Redirect
              to={{
                pathname: "/home",
              }}
            />
          </Route>
          <Route path="/login">
            <LoginPanel />
          </Route>
          <Route path="/home">
            <p>Protected</p>
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;

import React from 'react';
import LoginPanel from './login/LoginPanel';
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import MainPanel from './main/MainPanel';

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
        <CssBaseline />
        <Switch>
          <Route path="/login">
            <LoginPanel />
          </Route>
          <Route path="/">
            <MainPanel />
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;

import React from 'react';
import LoginPanel from './login/LoginPanel';
import { CssBaseline, makeStyles, Snackbar, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import MainPanel from './main/MainPanel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/root';
import { hideSnackbar } from './store/ui';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
})

function App() {
  const classes = useStyles()

  const dispatch = useDispatch()
  const snackbarMessage = useSelector<RootState, string | null>(state => state.ui.snackbarMessage)

  const handleSnackbarClose = () => {
    dispatch(hideSnackbar())
  }

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
        <Snackbar
          anchorOrigin={{vertical: "top", horizontal: "center"}}
          open={snackbarMessage !== null}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
        >
          <Alert severity="error">{snackbarMessage}</Alert>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
}

export default App;

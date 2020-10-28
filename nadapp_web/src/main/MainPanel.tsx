import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ExitToApp, Favorite, Home, Inbox, Mail, Search, SupervisorAccount } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useRouteMatch, Switch, Link, useHistory } from 'react-router-dom';
import { logoutRequest } from '../store/auth';
import { DoctorInfo } from '../store/profile';
import { RootState } from '../store/root';
import HomePanel from './HomePanel';
import PatientPanel from './patient/PatientPanel';
import PatientsPanel from './patients/PatientsPanel';
import ProfilePanel from './ProfilePanel';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color: "white",
    backgroundColor: theme.palette.primary.main,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 3, 3, 3),
    marginTop: 64,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
    marginRight: "auto",
    marginLeft: 130,
    width: '50%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    color: "#636E72",
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    width: 500,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  toolbarIconBtn: {
    color: "white",
  },
  toolbarLink: {
    color: "white",
  }
}))

function MainPanel() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const profileInfo = useSelector<RootState, DoctorInfo | null>(state => state.profile.info)
  let doctorName = ""
  if (profileInfo) {
    doctorName = `${profileInfo.title ?? ""} ${profileInfo.firstName} ${profileInfo.lastName}`.trim()
  }

  const { path, url } = useRouteMatch()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5">
            NAD-IICB
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Cerca..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Button className={classes.toolbarLink} component={Link} to="/profile">{doctorName}</Button>
          <IconButton className={classes.toolbarIconBtn} onClick={() => {
            dispatch(logoutRequest())
          }}><ExitToApp /></IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/patients">
              <ListItemIcon><SupervisorAccount /></ListItemIcon>
              <ListItemText primary="Pazienti" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><Favorite /></ListItemIcon>
              <ListItemText primary="Medici" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Switch>
          <Route exact path={path}>
            <HomePanel />
          </Route>
          <Route path={`${path}profile`}>
            <ProfilePanel />
          </Route>
          <Route exact path={`${path}patients`}>
            <PatientsPanel />
          </Route>
          <Route path={`${path}patients/:patientId`}>
            <PatientPanel />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default MainPanel


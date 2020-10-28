import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText, TextField, Toolbar, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ExitToApp, Favorite, Home, Inbox, Mail, Search, SupervisorAccount } from '@material-ui/icons';
import { Alert, Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useRouteMatch, Switch, Link, useHistory } from 'react-router-dom';
import { SEARCH_ENDPOINT } from '../serverConfig';
import { logoutRequest } from '../store/auth';
import { DoctorInfo } from '../store/profile';
import { RootState } from '../store/root';
import HomePanel from './HomePanel';
import PatientPanel from './patients/details/PatientPanel';
import PatientsPanel from './patients/PatientsPanel';
import ProfilePanel from './ProfilePanel';
import axios from "axios"
import { ShortPatientInfo } from '../store/patients';
import { ShortDoctorInfo } from '../store/doctors';
import DoctorsPanel from './doctors/DoctorsPanel';
import DoctorPanel from './doctors/details/DoctorPanel';

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
    "& fieldset": {
      borderStyle: "none"
    },
  },
  inputInput: {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
  },
  toolbarIconBtn: {
    color: "white",
  },
  toolbarLink: {
    color: "white",
  }
}))

type PatientSearchResult = {
  type: "patient"
  id: number
  name: string
}

type DoctorSearchResult = {
  type: "doctor"
  id: number
  name: string
}

type SearchResult = PatientSearchResult | DoctorSearchResult

function MainPanel() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const profileInfo = useSelector<RootState, DoctorInfo | null>(state => state.profile.info)
  let doctorName = ""
  if (profileInfo) {
    doctorName = `${profileInfo.title ?? ""} ${profileInfo.firstName} ${profileInfo.lastName}`.trim()
  }

  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const fetchSearchResults = async (query: string) => {
    try {
      const response = await axios.get(SEARCH_ENDPOINT, { params: {q: query} })
      let results: SearchResult[] = []
      if (response.data.patients) {
        const patientResults = response.data.patients.map((patient: ShortPatientInfo) => {
          const name = `${patient.firstName} ${patient.lastName}`
          return {
            type: "patient",
            id: patient.id,
            name,
          }
        })
        results = [...results, ...patientResults]
      }
      if (response.data.doctors) {
        const doctorResults = response.data.doctors.map((doctor: ShortDoctorInfo) => {
          const name = `${doctor.title ?? ""} ${doctor.firstName} ${doctor.lastName}`.trim()
          return {
            type: "doctor",
            id: doctor.id,
            name,
          }
        })
        results = [...results, ...doctorResults]
      }
      setSearchResults(results)
    } catch (err) {
      console.log("search error:", err.response.data)
      if (err.response.status === 401) {
        dispatch(logoutRequest())
      }
      throw err
    }
  }
  const searchResultSelected = (result: SearchResult) => {
    if (result.type === "doctor") {
      history.push("/doctors/" + result.id)
    } else if (result.type === "patient") {
      history.push("/patients/" + result.id)
    }
    setSearchResults([])
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
            <Autocomplete
              disableClearable
              options={searchResults}
              getOptionLabel={result => {
                if (result.type === "doctor") {
                  return `Medici > ${result.name}`
                } else if (result.type === "patient") {
                  return `Pazienti > ${result.name}`
                } else {
                  return ""
                }
              }}
              className={classes.inputRoot}
              onChange={(e, value) => searchResultSelected(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className={classes.inputInput}
                  onChange={(e) => fetchSearchResults(e.target.value)}
                  placeholder="Cerca..."
                  variant="outlined"
                  InputProps={{ ...params.InputProps, style: { padding: 0 }, type: 'search' }}
                />
              )}
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
            <ListItem button component={Link} to="/doctors">
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
          <Route exact path={`${path}doctors`}>
            <DoctorsPanel />
          </Route>
          <Route path={`${path}doctors/:doctorId`}>
            <DoctorPanel />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default MainPanel


import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard } from '@material-ui/icons';
import React from 'react';
import Medicine from "../images/medicine.svg"
import People from "../images/people.svg"
import { useDispatch } from 'react-redux';
import InnerPanel from './InnerPanel';
import HomeCard from './common/HomeCard';

const useStyles = makeStyles({
  root: {},
  button: {
    minWidth: 150,
  },
  card: {
    textAlign: "center",
  }
})

function HomePanel() {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <InnerPanel title="Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <HomeCard 
            title="Pazienti"
            image={People}
            buttonText="Visualizza i pazienti"
            buttonLink="/patients"
          /> 
        </Grid>
        <Grid item xs={6}>
          <HomeCard 
            title="Medici"
            image={Medicine}
            buttonText="Visualizza i medici"
            buttonLink="/doctors"
          /> 
        </Grid>
      </Grid>

    </InnerPanel>
  )
}
export default HomePanel
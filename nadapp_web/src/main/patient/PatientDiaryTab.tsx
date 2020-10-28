import { Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPatientMeals, fetchPatientProfile, MealEntry, PatientProfile } from '../../store/patients';
import { fetchProfileInfo } from '../../store/profile';
import { RootState } from '../../store/root';
import FieldCell from '../common/FieldCell';
import DiaryItem from './DiaryItem';

const useStyles = makeStyles({
  root: {},
  table: {
    fontSize: 20,
  }
})

interface Props {
  patientId: number,
}

function PatientDiaryTab({ patientId }: Props) {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPatientMeals(patientId))
  }, [])

  const meals = useSelector<RootState, MealEntry[]>(state => state.patients.currentPatientMeals)
  const mealItems = meals.map(meal => <DiaryItem meal={meal} />)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="diario alimentare">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Descrizione</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mealItems}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default PatientDiaryTab
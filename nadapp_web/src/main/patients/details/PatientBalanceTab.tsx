import { Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BalanceEntry, fetchPatientBalances, fetchPatientMeals, fetchPatientProfile, MealEntry, PatientProfile } from '../../../store/patients';
import { fetchProfileInfo } from '../../../store/profile';
import { RootState } from '../../../store/root';
import FieldCell from '../../common/FieldCell';
import BalanceItem from './BalanceItem';
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

function PatientBalanceTab({ patientId }: Props) {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPatientBalances(patientId))
  }, [patientId])

  const balances = useSelector<RootState, BalanceEntry[]>(state => state.patients.currentPatientBalances)
  const balanceItems = balances.map(balance => <BalanceItem balance={balance} />)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="bilancio idrico">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Minima</TableCell>
            <TableCell>Massima</TableCell>
            <TableCell>Frequenza</TableCell>
            <TableCell>Peso</TableCell>
            <TableCell>Diuresi</TableCell>
            <TableCell>Liquidi OS</TableCell>
            <TableCell>N. Feci</TableCell>
            <TableCell>Consistenza</TableCell>
            <TableCell>Volume Stomia</TableCell>
            <TableCell>Volume PEG</TableCell>
            <TableCell>Altre perdite Gastro</TableCell>
            <TableCell>Volume nutrizione Parenterale</TableCell>
            <TableCell>Altri liquidi endovena</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {balanceItems}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default PatientBalanceTab
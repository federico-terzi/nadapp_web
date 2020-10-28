import { Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients, ShortPatientInfo } from '../../store/patients';
import { DoctorInfo } from '../../store/profile';
import { RootState } from '../../store/root';
import FieldCell from './../common/FieldCell';
import InnerPanel from './../InnerPanel';
import PatientListItem from './PatientListItem';

const useStyles = makeStyles({
  root: {},
  table: {
    fontSize: 20,
  }
})

function PatientsPanel() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPatients())
  }, [])

  const patients = useSelector<RootState, ShortPatientInfo[]>(state => state.patients.shortPatientList)
  const patientList = patients.map(patient => <PatientListItem patient={patient}/>)

  return (
    <InnerPanel title="Pazienti">
      <Card>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="pazienti">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Azioni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patientList}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </InnerPanel>
  )
}
export default PatientsPanel
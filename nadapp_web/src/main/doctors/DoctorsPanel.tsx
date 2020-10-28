import { Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors, ShortDoctorInfo } from '../../store/doctors';
import { fetchPatients, ShortPatientInfo } from '../../store/patients';
import { DoctorInfo } from '../../store/profile';
import { RootState } from '../../store/root';
import FieldCell from './../common/FieldCell';
import InnerPanel from './../InnerPanel';
import DoctorListItem from './DoctorListItem';

const useStyles = makeStyles({
  root: {},
  table: {
    fontSize: 20,
  }
})

function DoctorsPanel() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDoctors())
  }, [])

  const doctors = useSelector<RootState, ShortDoctorInfo[]>(state => state.doctors.shortDoctorList)
  const doctorList = doctors.map(doctor => <DoctorListItem doctor={doctor}/>)

  return (
    <InnerPanel title="Medici">
      <Card>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="medici">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctorList}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </InnerPanel>
  )
}
export default DoctorsPanel
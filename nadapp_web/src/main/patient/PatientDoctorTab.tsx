import { Box, Button, Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CloudUpload } from '@material-ui/icons';
import axios from "axios";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePatientReportUploadEndpoint } from '../../serverConfig';
import { fetchPatientDoctors, fetchPatientReports, DoctorEntry } from '../../store/patients';
import { RootState } from '../../store/root';
import DoctorItem from './DoctorItem';
import ReportItem from './ReportItem';

const useStyles = makeStyles({
  root: {},
  table: {
    fontSize: 20,
  }
})

interface Props {
  patientId: number,
}

function PatientDoctorTab({ patientId }: Props) {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPatientDoctors(patientId))
  }, [])

  const doctors = useSelector<RootState, DoctorEntry[]>(state => state.patients.currentPatientDoctors)
  const doctorItems = doctors.map(doctor => <DoctorItem doctor={doctor} />)

  return (
    <Card>
      {/* <Box m={3}>
        <Button
          variant="contained"
          component="label"
          color="primary"
          startIcon={<CloudUpload />}
        >
          Aggiungi medico
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFileUpload(e.target.files[0])
              }
            }
            }
            style={{ display: "none" }}
          />
        </Button>
      </Box> */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="medici autorizzati">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Indirizzo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctorItems}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
export default PatientDoctorTab
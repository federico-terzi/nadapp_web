import { Box, Button, Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CloudUpload } from '@material-ui/icons';
import axios from "axios";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePatientReportUploadEndpoint } from '../../serverConfig';
import { fetchPatientReports, ReportEntry } from '../../store/patients';
import { RootState } from '../../store/root';
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

function PatientReportTab({ patientId }: Props) {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPatientReports(patientId))
  }, [])

  const reports = useSelector<RootState, ReportEntry[]>(state => state.patients.currentPatientReports)
  const reportItems = reports.map(report => <ReportItem report={report} patientId={patientId} />)

  const handleFileUpload = async (file: File) => {
    const url = generatePatientReportUploadEndpoint(patientId);
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    try {
      await axios.post(url, formData, config)
      dispatch(fetchPatientReports(patientId))
    } catch (e) {
      alert("Impossible caricare il referto")
    }
  }

  return (
    <Card>
      <Box m={3}>
        <Button
          variant="contained"
          component="label"
          color="primary"
          startIcon={<CloudUpload />}
        >
          Carica referto
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
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="referti">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Visualizza</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportItems}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
export default PatientReportTab
import { Card, Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPatientProfile, PatientProfile } from '../../store/patients';
import { fetchProfileInfo } from '../../store/profile';
import { RootState } from '../../store/root';
import FieldCell from '../common/FieldCell';

const useStyles = makeStyles({
  root: {},
  table: {
    fontSize: 20,
  }
})

interface Props {
  patientId: number,
}

function PatientProfileTab({ patientId }: Props) {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPatientProfile(patientId))
  }, [])

  const profile = useSelector<RootState, PatientProfile | null>(state => state.patients.currentPatientProfile)
  if (!profile) {
    return <></>
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="profilo">
        <TableBody>
          <FieldCell title="Nome" value={profile.firstName}/>
          <FieldCell title="Cognome" value={profile.lastName}/>
          <FieldCell title="CF" value={profile.CF} />
          <FieldCell title="Telefono" value={profile.telephone} />
          <FieldCell title="Email" value={profile.email} />
          <FieldCell title="Indirizzo" value={profile.address ?? ""} />
          <FieldCell title="Note" value={profile.notes ?? ""} />
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default PatientProfileTab
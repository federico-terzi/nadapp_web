import { Card, Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DoctorProfile, fetchDoctorProfile } from '../../../store/doctors';
import { fetchPatientProfile, PatientProfile } from '../../../store/patients';
import { fetchProfileInfo } from '../../../store/profile';
import { RootState } from '../../../store/root';
import FieldCell from '../../common/FieldCell';

const useStyles = makeStyles({
  root: {},
  table: {
    fontSize: 20,
  }
})

interface Props {
  doctorId: number,
}

function DoctorProfileTab({ doctorId }: Props) {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDoctorProfile(doctorId))
  }, [doctorId])

  const profile = useSelector<RootState, DoctorProfile | null>(state => state.doctors.currentDoctorProfile)
  if (!profile) {
    return <></>
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="profilo">
        <TableBody>
          <FieldCell title="Nome" value={`${profile.title ?? ""} ${profile.firstName} ${profile.lastName}`.trim()} />
          <FieldCell title="Email" value={profile.email ?? ""} />
          <FieldCell title="Tel. Pubblico" value={profile.publicTelephone ?? ""} />
          <FieldCell title="Indirizzo" value={profile.address ?? ""} />
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default DoctorProfileTab
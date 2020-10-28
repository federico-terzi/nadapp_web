import { TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { ShortPatientInfo } from '../../store/patients';

const useStyles = makeStyles({
  root: {},
})

interface Props {
  patient: ShortPatientInfo,
}

function PatientListItem({ patient }: Props): React.ReactElement<Props> {
  const classes = useStyles()

  return (
    <TableRow key={patient.id}>
      <TableCell>
        <Link to={`/patients/${patient.id}/`}>{`${patient.firstName} ${patient.lastName}`}</Link>
      </TableCell>
    </TableRow>
  );
}
export default PatientListItem
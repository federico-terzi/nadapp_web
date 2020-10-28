import { TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { DoctorEntry, ShortPatientInfo } from '../../store/patients';

interface Props {
  doctor: DoctorEntry,
}

function DoctorItem({ doctor }: Props): React.ReactElement<Props> {
  return (
    <TableRow key={doctor.id}>
      <TableCell>
        {`${doctor.title ?? ""} ${doctor.firstName} ${doctor.lastName}`.trim()}
      </TableCell>
      <TableCell>
        {doctor.publicTelephone ?? ""}
      </TableCell>
      <TableCell>
        {doctor.email ?? ""}
      </TableCell>
      <TableCell>
        {doctor.address ?? ""}
      </TableCell>
    </TableRow>
  );
}
export default DoctorItem
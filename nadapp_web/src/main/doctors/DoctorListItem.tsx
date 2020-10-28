import { TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { ShortDoctorInfo } from '../../store/doctors';

const useStyles = makeStyles({
  root: {},
})

interface Props {
  doctor: ShortDoctorInfo,
}

function DoctorListInfo({ doctor }: Props): React.ReactElement<Props> {
  const classes = useStyles()

  return (
    <TableRow key={doctor.id}>
      <TableCell>
        <Link to={`/doctors/${doctor.id}/`}>{`${doctor.firstName} ${doctor.lastName}`}</Link>
      </TableCell>
    </TableRow>
  );
}
export default DoctorListInfo
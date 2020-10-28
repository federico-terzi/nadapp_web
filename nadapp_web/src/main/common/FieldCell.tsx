import { TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

interface Props {
  title: string,
  value: string,
}

function FieldCell({ title, value }: Props): React.ReactElement<Props> {
  return (
    <TableRow>
      <TableCell><b>{title + ":"}</b></TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
}
export default FieldCell
import { TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { MealEntry, ShortPatientInfo } from '../../store/patients';

interface Props {
  meal: MealEntry,
}

function DiaryItem({ meal }: Props): React.ReactElement<Props> {
  const formattedDate = new Date(meal.date)
  return (
    <TableRow key={meal.uuid}>
      <TableCell>
        {formattedDate.toLocaleString()}
      </TableCell>
      <TableCell>
        {meal.meal}
      </TableCell>
    </TableRow>
  );
}
export default DiaryItem
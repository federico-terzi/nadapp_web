import { TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { BalanceEntry, MealEntry, ShortPatientInfo } from '../../../store/patients';

interface Props {
  balance: BalanceEntry,
}

function BalanceItem({ balance }: Props): React.ReactElement<Props> {
  const formattedDate = new Date(balance.date)
  return (
    <TableRow key={balance.uuid}>
      <TableCell>
        {formattedDate.toLocaleString()}
      </TableCell>
      <TableCell>
        {balance.minPressure ?? ""}
      </TableCell>
      <TableCell>
        {balance.maxPressure ?? ""}
      </TableCell>
      <TableCell>
        {balance.heartFrequency ?? ""}
      </TableCell>
      <TableCell>
        {balance.weight ?? ""}
      </TableCell>
      <TableCell>
        {balance.diuresis ?? ""}
      </TableCell>
      <TableCell>
        {balance.osLiquids ?? ""}
      </TableCell>
      <TableCell>
        {balance.fecesCount ?? ""}
      </TableCell>
      <TableCell>
        {balance.fecesTexture ?? ""}
      </TableCell>
      <TableCell>
        {balance.ostomyVolume ?? ""}
      </TableCell>
      <TableCell>
        {balance.pegVolume ?? ""}
      </TableCell>
      <TableCell>
        {balance.otherGastrointestinalLosses ?? ""}
      </TableCell>
      <TableCell>
        {balance.parenteralNutritionVolume ?? ""}
      </TableCell>
      <TableCell>
        {balance.otherIntravenousLiquids ?? ""}
      </TableCell>
    </TableRow>
  );
}
export default BalanceItem
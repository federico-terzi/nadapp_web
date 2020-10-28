import { TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { generatePatientReportDownloadEndpoint } from '../../serverConfig';
import { ReportEntry, ShortPatientInfo } from '../../store/patients';

interface Props {
  patientId: number,
  report: ReportEntry,
}

function ReportItem({ report, patientId }: Props): React.ReactElement<Props> {
  const formattedDate = new Date(report.date)
  return (
    <TableRow key={report.id}>
      <TableCell>
        {formattedDate.toLocaleString()}
      </TableCell>
      <TableCell>
        <a target="_blank" href={generatePatientReportDownloadEndpoint(patientId, report.id)}>Clicca qui per visualizzare il referto</a>
      </TableCell>
    </TableRow>
  );
}
export default ReportItem
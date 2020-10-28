import { AppBar, Card, Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TabPanel } from '@material-ui/lab';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InnerPanel from '../InnerPanel';
import PatientBalanceTab from './PatientBalanceTab';
import PatientDiaryTab from './PatientDiaryTab';
import PatientDoctorTab from './PatientDoctorTab';
import PatientProfileTab from './PatientProfileTab';
import PatientReportTab from './PatientReportTab';

const useStyles = makeStyles({
  root: {},
  table: {
    fontSize: 20,
  }
})

type Tabs = "profile" | "diary" | "balance" | "report" | "doctors"

interface MatchParams {
  patientId: string
}

function PatientPanel() {
  const classes = useStyles()

  const { patientId } = useParams<MatchParams>()
  const intPatientId = parseInt(patientId)

  const [tab, setTab] = useState<Tabs>("profile")

  return (
    <InnerPanel title="Paziente">
      <Card>
        <Paper square>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, value) => setTab(value as Tabs)}
          >
            <Tab label="Profilo" value="profile"/>
            <Tab label="Diario alimentare" value="diary" />
            <Tab label="Bilancio" value="balance" />
            <Tab label="Referti" value="report" />
            <Tab label="Medici" value="doctors" />
          </Tabs>
        </Paper>
        { tab === "profile" && 
          <PatientProfileTab patientId={intPatientId} />
        }
        { tab === "diary" && 
          <PatientDiaryTab patientId={intPatientId} />
        }
        { tab === "balance" && 
          <PatientBalanceTab patientId={intPatientId} />
        }
        { tab === "report" && 
          <PatientReportTab patientId={intPatientId} />
        }
        { tab === "doctors" && 
          <PatientDoctorTab patientId={intPatientId} />
        }
      </Card>
    </InnerPanel>
  )
}
export default PatientPanel
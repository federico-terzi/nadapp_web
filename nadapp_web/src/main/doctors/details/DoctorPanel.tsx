import { Card, Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InnerPanel from '../../InnerPanel';
import DoctorProfileTab from './DoctorProfileTab';

const useStyles = makeStyles({
  root: {},
  table: {
    fontSize: 20,
  }
})

type Tabs = "profile"

interface MatchParams {
  doctorId: string
}

function DoctorPanel() {
  const classes = useStyles()

  const { doctorId } = useParams<MatchParams>()
  const intDoctorId = parseInt(doctorId)

  const [tab, setTab] = useState<Tabs>("profile")

  return (
    <InnerPanel title="Medico">
      <Card>
        <Paper square>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, value) => setTab(value as Tabs)}
          >
            <Tab label="Profilo" value="profile"/>
          </Tabs>
        </Paper>
        { tab === "profile" && 
          <DoctorProfileTab doctorId={intDoctorId} />
        }
      </Card>
    </InnerPanel>
  )
}
export default DoctorPanel
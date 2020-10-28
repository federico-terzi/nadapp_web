import { Card, Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DoctorInfo } from '../store/profile';
import { RootState } from '../store/root';
import FieldCell from './common/FieldCell';
import InnerPanel from './InnerPanel';

const useStyles = makeStyles({
  root: {},
  table: {
    fontSize: 20,
  }
})

function ProfilePanel() {
  const classes = useStyles()

  const profile = useSelector<RootState, DoctorInfo | null>(state => state.profile.info)
  if (!profile) {
    return <></>
  }

  return (
    <InnerPanel title="Profilo">
      <Card>
        <table className={classes.table}>
          
        </table>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="profilo">
            <TableBody>
              <FieldCell title="Nome" value={`${profile.title ?? ""} ${profile.firstName} ${profile.lastName}`.trim()} />
              <FieldCell title="Username" value={profile.username ?? ""} />
              <FieldCell title="CF" value={profile.CF ?? ""} />
              <FieldCell title="Telefono" value={profile.telephone ?? ""} />
              <FieldCell title="Email" value={profile.email ?? ""} />
              <FieldCell title="Tel. Pubblico" value={profile.publicTelephone ?? ""} />
              <FieldCell title="Indirizzo" value={profile.address ?? ""} />
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </InnerPanel>
  )
}
export default ProfilePanel
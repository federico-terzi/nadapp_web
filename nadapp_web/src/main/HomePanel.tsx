import { makeStyles } from '@material-ui/core/styles';
import { Dashboard } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import InnerPanel from './InnerPanel';

const useStyles = makeStyles({
  root: {},
  button: {
    minWidth: 150,
  }
})

function HomePanel() {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <InnerPanel title="Dashboard">
      <p>TODO: dashboard</p>
    </InnerPanel>
  )
}
export default HomePanel
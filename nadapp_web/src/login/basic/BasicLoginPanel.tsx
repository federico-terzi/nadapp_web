import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/root';
import PhaseOne from './PhaseOne';
import PhaseTwo from './PhaseTwo';

const useStyles = makeStyles({
  root: {
    
  },
})


function BasicLoginPanel() {
  const classes = useStyles()

  const basicLoginVerificaitonToken = useSelector<RootState>(state => state.auth.basicLoginVerificationToken)

  let formContent 
  if (!basicLoginVerificaitonToken) { // Phase 1
    formContent = <PhaseOne />
  } else { // Phase 2
    formContent = <PhaseTwo />
  } 

  return (
    <div className={classes.root}>
      {formContent}
    </div>
  );
}

export default BasicLoginPanel


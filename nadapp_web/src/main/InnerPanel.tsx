import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  root: {},
})

interface Props {
  title: string,
  children: React.ReactNode
}

function InnerPanel({ title, children }: Props): React.ReactElement<Props> {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
export default InnerPanel
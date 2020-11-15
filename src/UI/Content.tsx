import { makeStyles } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
  },
  content: {
    maxWidth: 1024,
    width: '95%',
  },
});

const Content: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default Content;

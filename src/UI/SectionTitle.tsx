import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import ReactTextTransition, { presets } from 'react-text-transition';

const useStyles = makeStyles({
  text: {
    fontSize: '2rem',
    margin: '1.5rem 0',
  },
});

interface Props {
  children: string;
}

const SectionTitle: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return <ReactTextTransition className={classes.text} spring={presets.wobbly} text={children} />;
};

export default SectionTitle;

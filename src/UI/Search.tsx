import { makeStyles } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles({
  search: {
    backgroundColor: 'rgba(255, 255, 255, .85)',
    border: 0,
    borderRadius: '.5rem',
    fontSize: '1.1rem',
    marginTop: '3rem',
    padding: '.8rem 1rem',
    textAlign: 'center',
    width: 400,
    '&:focus': {
      outline: 'none',
    },
  },
});

const Search: React.FC = () => {
  const classes = useStyles();
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    if (text) {
      history.replaceState('', document.title, `${location.pathname}?search=${text}`);
    } else {
      history.replaceState('', document.title, `${location.pathname}`);
    }
  }, [text]);

  const onChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  }, []);

  return (
    <input
      className={classes.search}
      onChange={onChange}
      placeholder="Search for your next favorite story"
      value={text}
    />
  );
};

export default Search;

import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { moviesActions } from '../Movies';
import { getSearchText, useDebounce } from '../util';

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
    zIndex: 2,
  },
});

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [text, setText] = React.useState(getSearchText());
  const debouncedText = useDebounce(text, 500);

  React.useEffect(() => {
    dispatch(moviesActions.setSearchText(debouncedText));
  }, [debouncedText]);

  React.useEffect(() => {
    if (!text) {
      dispatch(moviesActions.clearSearchText());
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

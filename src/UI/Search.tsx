import { Chip, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import FilterListIcon from '@material-ui/icons/FilterList';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { moviesActions } from '../Movies';
import { getSearchText, useDebounce, useSwitch } from '../util';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    position: 'relative',
  },
  search: {
    backgroundColor: 'rgba(255, 255, 255, .85)',
    border: 0,
    borderRadius: '.5rem',
    fontSize: '1.1rem',
    marginTop: '3rem',
    padding: '.8rem 2.5rem .8rem 1rem',
    textAlign: 'center',
    width: 400,
    zIndex: 2,
    '&:focus': {
      outline: 'none',
    },
    '&:not(:placeholder-shown) + div': {
      opacity: 1,
    },
  },
  filter: {
    marginTop: '1rem',
    opacity: 0,
    transition: 'all 0.3s cubic-bezier(.25, .8, .25, 1)',
  },
  clear: {
    backgroundColor: 'transparent',
    border: 0,
    color: 'black',
    cursor: 'pointer',
    position: 'absolute',
    right: '.5rem',
    top: '3.6rem',
    '&:focus': {
      outline: 'none',
    },
    zIndex: 3,
  },
});

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [text, setText] = React.useState(getSearchText());
  const debouncedText = useDebounce(text, 500);
  const [isFiltering, switchFiltering] = useSwitch(false);
  const [stars, setStars] = React.useState<number | null>();

  React.useEffect(() => {
    if (debouncedText) {
      dispatch(moviesActions.setSearchText(debouncedText));
    }
  }, [debouncedText]);

  React.useEffect(() => {
    if (!text) {
      dispatch(moviesActions.clearSearchText());
    }
  }, [text]);

  React.useEffect(() => {
    if (!isFiltering) {
      setStars(null);
    }
  }, [isFiltering]);

  React.useEffect(() => {
    dispatch(moviesActions.setSearchFilters({ vote: stars }));
  }, [stars]);

  const onChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  }, []);

  const onRate = React.useCallback((event: React.ChangeEvent<{}>, value: number | null) => {
    setStars(value);
  }, []);

  return (
    <div className={classes.container}>
      <input
        className={classes.search}
        onChange={onChange}
        placeholder="Search for your next favorite story"
        value={text}
      />
      <Chip
        avatar={<FilterListIcon />}
        className={classes.filter}
        clickable
        label={isFiltering ? <Rating name="vote" onChange={onRate} value={stars} /> : 'Filter Results'}
        onDelete={isFiltering ? switchFiltering : undefined}
        onClick={!isFiltering ? switchFiltering : undefined}
      />
      {text && (
        <button className={classes.clear} onClick={() => setText('')}>
          <BackspaceIcon />
        </button>
      )}
    </div>
  );
};

export default Search;

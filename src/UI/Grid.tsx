import { makeStyles, Paper } from '@material-ui/core';
import * as React from 'react';
import Movie from './Movie';
import SectionTitle from './SectionTitle';

const useStyles = makeStyles({
  container: (props: { highlightFirst: boolean; rows: number }) => ({
    display: 'grid',
    columnGap: '1rem',
    gridTemplateColumns: props.highlightFirst ? '1.5fr repeat(3, 1fr)' : 'repeat(4, 1fr)',
    gridTemplateRows: `repeat(${props.rows}, 300px) repeat(100, minmax(0px, 0))`,
    marginBottom: '5rem',
    overflow: 'hidden',
    rowGap: `repeat(${props.rows}, 2rem) repeat(100, 0)`,
  }),
});

interface Props {
  highlightFirst?: boolean;
  movieList: MovieDB.Objects.Movie[];
  rows?: number;
  title: string;
}

const Grid: React.FC<Props> = ({ highlightFirst = false, movieList, title, rows = 2 }) => {
  const classes = useStyles({ highlightFirst, rows });

  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <Paper className={classes.container} elevation={0}>
        {movieList.map((movie, ix) => (
          <Movie highlightFirst={highlightFirst} key={movie.id} movie={movie} positionIx={ix} />
        ))}
      </Paper>
    </>
  );
};

export default Grid;

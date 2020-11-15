import { makeStyles, Paper } from '@material-ui/core';
import * as React from 'react';
import Movie from './Movie';
import SectionTitle from './SectionTitle';

const useStyles = makeStyles({
  container: (props: { highlightFirst: boolean; rows: number }) => ({
    display: 'grid',
    columnGap: '1rem',
    gridTemplateColumns: props.highlightFirst ? '1.5fr repeat(3, 1fr)' : 'repeat(4, 1fr)',
    gridTemplateRows: `repeat(${props.rows}, 300px)`,
    marginBottom: '5rem',
    overflow: 'hidden',
    rowGap: `repeat(${props.rows}, 2rem)`,
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
        {movieList
          .filter((_, ix) => ix < rows * 4 - (highlightFirst ? 1 : 0))
          .map((movie, ix) => (
            <Movie highlightFirst={highlightFirst} key={movie.id} movie={movie} positionIx={ix} />
          ))}
      </Paper>
    </>
  );
};

export default Grid;

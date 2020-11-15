import { makeStyles, Modal, Paper } from '@material-ui/core';
import * as React from 'react';
import Details from './Details';
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
    transition: 'all 0.3s cubic-bezier(.25, .8, .25, 1)',
  }),
  modal: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
});

interface Props {
  highlightFirst?: boolean;
  movieList: MovieDB.Objects.Movie[];
  rows?: number;
  title: string;
}

const Grid: React.FC<Props> = ({ highlightFirst = false, movieList, title, rows = 2 }) => {
  const classes = useStyles({ highlightFirst, rows });
  const [isModalOpen, setModal] = React.useState(false);
  const [selectedMovie, setMovie] = React.useState<MovieDB.Objects.Movie | null>(null);

  const onClose = React.useCallback(() => {
    setModal(false);
    setMovie(null);
  }, []);

  const onMovieSelect = React.useCallback((movie: MovieDB.Objects.Movie) => {
    setModal(true);
    setMovie(movie);
  }, []);

  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <Paper className={classes.container} elevation={0}>
        {movieList
          .filter((_, ix) => ix < rows * 4 - (highlightFirst ? 1 : 0))
          .map((movie, ix) => (
            <Movie
              highlightFirst={highlightFirst}
              key={movie.id}
              movie={movie}
              onClick={onMovieSelect}
              positionIx={ix}
            />
          ))}
      </Paper>
      <Modal className={classes.modal} open={isModalOpen} onClose={onClose}>
        {selectedMovie ? <Details movie={selectedMovie!} /> : <></>}
      </Modal>
    </>
  );
};

export default Grid;

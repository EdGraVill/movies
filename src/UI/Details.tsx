import { Card, CardContent, Chip, makeStyles, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { genreMapSelector, getImageURL } from '../Movies';

const useStyles = makeStyles({
  layout: {
    display: 'flex',
  },
  image: {
    height: 300,
    width: 200,
  },
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
    marginLeft: '1rem',
    width: 300,
  },
  genre: {
    margin: '.3rem .5rem',
  },
});

interface Props {
  movie: MovieDB.Objects.Movie;
}

const Details: React.FC<Props> = ({ movie }) => {
  const classes = useStyles();
  const genreMap = useSelector(genreMapSelector);

  return (
    <Card elevation={5}>
      <CardContent className={classes.layout}>
        <img className={classes.image} src={getImageURL(movie.poster_path!, { size: '200' })} />
        <div className={classes.content}>
          <Typography gutterBottom={movie.title === movie.original_title} variant="h5">
            {movie.title}{' '}
            <Typography variant="caption" component="span">
              {movie.release_date.slice(0, 4)}
            </Typography>
          </Typography>
          {movie.title !== movie.original_title && (
            <Typography gutterBottom variant="subtitle2">
              ({movie.original_title})
            </Typography>
          )}
          <Typography gutterBottom>
            <Rating readOnly value={Math.floor((movie.vote_average - 0.0001) / 2) + 1} />
            <Typography variant="caption" component="span">
              {movie.vote_count} votes
            </Typography>
          </Typography>
          <Typography gutterBottom variant="body2">
            {movie.overview}
          </Typography>
          <div>
            {movie.genre_ids.map((id) => (
              <Chip className={classes.genre} key={id} label={genreMap[id]} size="small" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Details;

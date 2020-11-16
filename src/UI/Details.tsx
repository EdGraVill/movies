import { Card, CardContent, Chip, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { genreMapSelector, getImageURL } from '../Movies';

const useStyles = makeStyles((theme) => ({
  layout: {
    display: 'flex',
    flexFlow: 'row wrap',
    maxHeight: '90vh',
  },
  image: {
    height: 300,
    width: 200,
    [theme.breakpoints.down('md')]: {
      height: 150,
      width: 100,
    },
  },
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
    marginLeft: '1rem',
    width: 300,
    [theme.breakpoints.down('md')]: {
      width: 'calc(100% - 100px - 1rem)',
    },
  },
  genreList: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    margin: '.3rem 0',
    width: '100%',
    '& > div': {
      marginBottom: '.5rem',
    },
  },
  overview: {
    marginTop: '1rem',
    width: '100%',
  },
}));

interface Props {
  movie: MovieDB.Objects.Movie;
}

const Details: React.FC<Props> = ({ movie }) => {
  const classes = useStyles();
  const genreMap = useSelector(genreMapSelector);
  const isMobile = useMediaQuery('(max-width: 960px)');

  const Overview = (
    <Typography className={classes.overview} gutterBottom variant="body2">
      {movie.overview}
    </Typography>
  );

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
          {!isMobile && Overview}
          <div className={classes.genreList}>
            {movie.genre_ids.map((id) => (
              <Chip key={id} label={genreMap[id]} size="small" />
            ))}
          </div>
        </div>
        {isMobile && Overview}
      </CardContent>
    </Card>
  );
};

export default Details;

import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { getImageURL, searchFiltersSelector } from '../Movies';

const useStyles = makeStyles((theme) => ({
  root: (props: { highlightFirst: boolean; positionIx: number }) => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    gridRow: props.highlightFirst && props.positionIx === 0 ? '1/3' : 'initial',
    '& p':
      props.highlightFirst && props.positionIx === 0
        ? {
            overflow: 'initial',
          }
        : {},
    [theme.breakpoints.down('md')]: {
      gridColumn: props.highlightFirst && props.positionIx === 0 ? '1/3' : 'initial',
      gridRow: 'initial',
      '& p':
        props.highlightFirst && props.positionIx === 0
          ? {
              overflow: 'hidden',
            }
          : {},
    },
  }),
  media: {
    height: 120,
  },
  overview: {
    height: '6.1em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  area: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

interface Props {
  highlightFirst: boolean;
  movie: MovieDB.Objects.Movie;
  onClick?(movie: MovieDB.Objects.Movie): void;
  positionIx: number;
}

const Movie: React.FC<Props> = ({ highlightFirst, movie, onClick, positionIx }) => {
  const classes = useStyles({ highlightFirst, positionIx });
  const filters = useSelector(searchFiltersSelector);

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.area} onClick={() => (onClick ? onClick(movie) : null)}>
        <CardMedia className={classes.media} image={getImageURL(movie.backdrop_path!)} />
        <CardContent>
          {typeof filters.vote === 'number' && <Rating readOnly size="small" value={filters.vote} />}
          <Typography gutterBottom>{movie.title}</Typography>
          <Typography className={classes.overview} color="textSecondary" component="p" variant="body2">
            {movie.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Movie;

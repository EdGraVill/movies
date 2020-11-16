import { makeStyles, Paper } from '@material-ui/core';
import * as React from 'react';
import { discover, getImageURL } from '../Movies';
import { randomBetween } from '../util';
import logo from '../assets/logo.svg';
import Search from './Search';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 500,
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(.25, .8, .25, 1)',
    [theme.breakpoints.down('sm')]: {
      height: '55vh',
    },
  },
  containerInSearch: {
    height: 200,
    '& .brand': {
      marginBottom: '-200px',
      opacity: 0,
    },
  },
  backgorund: {
    backgroundColor: 'black',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  imagesContainer: {
    height: 500,
    transform: 'rotate(30deg)',
    width: '200vw',
  },
  image: {
    animation: 'jumbo_image 20s infinite',
    animationDirection: 'alternate',
    animationTimingFunction: 'linear',
    backfaceVisibility: 'hidden',
    height: 150,
    objectFit: 'contain',
    perspective: 1000,
    position: 'relative',
    width: 100,
  },
  content: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .4)',
    backdropFilter: 'blur(2px)',
    display: 'flex',
    flexFlow: 'column nowrap',
    height: '100%',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  brand: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(.25, .8, .25, 1)',
  },
  title: {
    color: 'white',
    fontFamily: '',
    fontSize: '3rem',
  },
  logo: {
    margin: '0 auto',
    width: 100,
  },
}));

const getRandomPosters = async (callback: (list: string[]) => void, nPages = 20) => {
  const pages = new Array(nPages).fill(0).map((_, ix, arr) => randomBetween(1, 50, arr));

  const results = await Promise.all(pages.map(async () => discover({ page: randomBetween(1, 500) })));

  const images = results.flatMap(({ data: { results } }) =>
    results
      .filter(({ poster_path }) => !!poster_path)
      .map(({ poster_path }) => getImageURL(poster_path!, { size: '200' })),
  );

  callback(images);
};

interface ImageSet {
  animationDuration: string;
  opacity: number;
  url: string;
  x: number;
  y: number;
}

const Jumbo: React.FC = () => {
  const [posterUrlList, setPosterUrlList] = React.useState<ImageSet[]>([]);
  const classes = useStyles();

  React.useEffect(() => {
    if (!posterUrlList.length) {
      getRandomPosters((list) =>
        setPosterUrlList(
          list.map(
            (url): ImageSet => ({
              animationDuration: `${randomBetween(20, 30)}s`,
              opacity: Math.random(),
              url,
              x: randomBetween(-5, 5),
              y: randomBetween(-5, 5),
            }),
          ),
        ),
      );
    }
  }, []);

  return (
    <Paper className={classes.container} elevation={5}>
      <div className={classes.backgorund}>
        <div className={classes.imagesContainer}>
          {posterUrlList.map(({ animationDuration, opacity, url, x, y }, ix) => (
            <img
              className={classes.image}
              key={ix}
              src={url}
              style={{
                animationDuration,
                opacity,
                transform: `translateX(${x}em) translateY(${y}em)`,
              }}
            />
          ))}
        </div>
      </div>
      <div className={classes.content}>
        <div className={`brand ${classes.brand}`}>
          <img alt="CINEMARS LOGO" className={classes.logo} src={logo} />
          <h1 className={classes.title}>CINEMARS</h1>
        </div>
        <Search />
      </div>
    </Paper>
  );
};

export default Jumbo;

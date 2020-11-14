import { makeStyles, Paper } from '@material-ui/core';
import * as React from 'react';
import { discover, getImageURL } from '../Movies';
import { randomBetween } from '../util';
import logo from '../assets/logo.svg';
import Search from './Search';

const useStyles = makeStyles({
  container: {
    height: 500,
    position: 'relative',
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
    height: '100%',
    overflow: 'hidden',
    width: '200vw',
  },
  image: {
    animation: 'jumbo_image 20s infinite',
    animationDirection: 'alternate',
    animationTimingFunction: 'linear',
    height: 150,
    objectFit: 'contain',
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
  title: {
    color: 'white',
    fontFamily: '',
    fontSize: '3rem',
  },
  logo: {
    width: 100,
  },
});

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

const Jumbo: React.FC = () => {
  const [posterUrlList, setPosterUrlList] = React.useState<string[]>([]);
  const classes = useStyles();

  React.useEffect(() => {
    getRandomPosters(setPosterUrlList);
  }, []);

  return (
    <Paper className={classes.container} elevation={5}>
      <div className={classes.backgorund}>
        <div className={classes.imagesContainer}>
          {posterUrlList.map((url, ix) => (
            <img
              className={classes.image}
              key={ix}
              src={url}
              style={{
                animationDuration: `${randomBetween(100, 300)}s`,
                opacity: Math.random(),
                transform: `
                  rotate(${randomBetween(28, 32)}deg)
                  translateX(${randomBetween(-5, 5)}em)
                  translateY(${randomBetween(-5, 5)}em)`,
              }}
            />
          ))}
        </div>
      </div>
      <div className={classes.content}>
        <img alt="CINEMARS LOGO" className={classes.logo} src={logo} />
        <h1 className={classes.title}>CINEMARS</h1>
        <Search />
      </div>
    </Paper>
  );
};

export default Jumbo;

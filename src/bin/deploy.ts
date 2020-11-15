import * as ghpages from 'gh-pages';

ghpages.publish(
  'build',
  {
    repo: `https://${process.env.GH_TOKEN}@github.com/EdGraVill/movies.git`,
    silent: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (err: any) => {
    if (err) {
      console.error(err);
      process.exit(err.errno || 0);
    }

    console.log('Deployed to https://edgravill.github.io/movies/');
  },
);

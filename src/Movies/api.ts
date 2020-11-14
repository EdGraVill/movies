import axios from 'axios';

export interface ImageURLConfig {
  size?: '200' | '500' | 'original';
}

export const getImageURL = (imagePath: string, config: ImageURLConfig = { size: 'original' }) => {
  const size = config.size! === 'original' ? 'original' : `w${config.size}`;

  return `https://image.tmdb.org/t/p/${size}/${imagePath}`;
};

export const apiKey = 'c076492e6459d16464611cae34b26ad3';

const agent = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: apiKey,
  },
});

export const discover = async (args?: MovieDB.Arguments.Discover.Movie['query']) =>
  agent.get<MovieDB.Responses.Discover.Movie>('/discover/movie', {
    params: args || {},
  });

export const getGenreList = async () => agent.get<MovieDB.Responses.Genre.Common>('/genre/movie/list');

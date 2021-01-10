import {FilterName} from "./utils";

export const filter = {
  [FilterName.ALL_MOVIES]: (movies) => movies,
  [FilterName.WATCHLIST]: (movies) => movies.filter((movie) => movie.watchList),
  [FilterName.HISTORY]: (movies) => movies.filter((movie) => movie.watched),
  [FilterName.FAVORITES]: (movies) => movies.filter((movie) => movie.favorite),
};

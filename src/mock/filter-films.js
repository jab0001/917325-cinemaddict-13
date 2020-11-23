const filmToFilterMap = {
  all: (filmCard) => filmCard.length,
  watchlist: (filmCard) => filmCard
    .filter((el) => el.watchList).length,
  history: (filmCard) => filmCard
    .filter((el) => el.watched).length,
  favorites: (filmCard) => filmCard
    .filter((el) => el.favorite).length,
};

export const generateFilter = (filmCard) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(filmCard),
    };
  });
};

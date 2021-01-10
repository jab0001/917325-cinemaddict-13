import {resultHoursMins} from "../utils/utils";

const summaryWatched = (array) => {
  const index = array.filter((el) => el.name === `history`);
  return index[0].count;
};

const summaryTime = (filmCard) => {
  const filmHours = filmCard.filter((el) => (el.watched ? el.duration : ``));
  const totalDuration = filmHours.reduce((acc, el) => {
    const mins = acc + el.duration;
    return mins;
  }, 0);

  return resultHoursMins(totalDuration);
};

const favoriteGenre = (filmCard) => {
  const resultGenres = [];
  filmCard.filter((el) => el.watched).map((el) => {
    resultGenres.push(...el.genre);
  });

  return resultGenres.sort()[0];
};

const userRank = (totalTime) => {
  if (totalTime[0] <= 14 && totalTime[0] > 12) {
    return `fighter`;
  }
  if (totalTime[0] > 14) {
    return `sci-fi`;
  } else {
    return `baby`;
  }
};

export const generateUserStats = (filmCard, filtered) => {
  return {
    totalWatched: summaryWatched(filtered),
    totalTime: summaryTime(filmCard),
    genre: favoriteGenre(filmCard),
    userRank: userRank(summaryTime(filmCard)),
  };
};

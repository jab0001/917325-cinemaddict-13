const summaryWatched = (array) => {
  const index = array.filter((el) => el.name === `history`);
  return index[0].count;
};

const summaryTime = (filmCard) => {
  const filmHours = filmCard.filter((el) => (el.watched ? el.duration : ``));
  const totalHours = filmHours.reduce((acc, el) => {
    const hour = +el.duration.split(` `)[0].slice().replace(`h`, ``);
    const hours = +acc + hour;
    return hours;
  }, 0);

  const totalMins = filmHours.reduce((acc, el) => {
    const min = +el.duration.split(` `)[1].slice().replace(`m`, ``);
    const mins = +acc + min;
    return mins;
  }, 0);

  const resultMins = totalHours * 60 + totalMins;
  const resultHoursMins = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return [hours, minutes];
  };

  return resultHoursMins(resultMins);
};

const userRank = (totalTime) => {
  if (totalTime[0] < 14 && totalTime[0] > 12) {
    return `fighter`;
  } else if (totalTime[0] > 14) {
    return `sci-fi`;
  } else {
    return `baby`;
  }
};

export const generateUserStats = (filmCard, filtered) => {
  return {
    totalWatched: summaryWatched(filtered),
    totalTime: summaryTime(filmCard),
    userRank: userRank(summaryTime(filmCard)),
  };
};

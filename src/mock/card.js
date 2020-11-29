import dayjs from "dayjs";
import {getRandomInteger} from "../utils";

const FILM_NAMES = [
  `Made for each other`,
  `Popeye meets Sinbad`,
  `Sagebrush trail`,
  `Santa claus conquers the martians`,
  `The dance of life`,
  `The great flamarion`,
  `The man with the golden arm`,
];
const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];
const GENRES = [`action`, `cartoon`, `comedy`, `horror`];
const AGE_LIMITS = [`3+`, `13+`, `16+`, `18+`];
const COUNTRYS = [`Russia`, `USA`, `Germany`, `Valhalla`];
const COMMENTS = {
  emoji: [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`],
  author: [`Bill`, `Maximilian`, `Vladilen`, `Lex`],
  text: [`hello`, `good`, `bad`, `good day`],
};

const generateArray = (array) => {
  const randomArray = [];
  const randomNumberComments = getRandomInteger(1, array.length);
  for (let j = 0; j < randomNumberComments; j++) {
    const randomComment = getRandomInteger(0, randomNumberComments - 1);
    randomArray.push(array[randomComment]);
  }

  const unique = [...new Set(randomArray)];
  return unique;
};

const generateDiscription = () => {
  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const descriptionArray = description.split(`. `);
  const randomNumberOfSentence = getRandomInteger(0, 4);
  const result = [];
  for (let i = 0; i <= randomNumberOfSentence; i++) {
    const randomSentence = getRandomInteger(0, descriptionArray.length - 1);
    result.push(descriptionArray[randomSentence]);
  }
  return result;
};

const getRandomItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

const generateYear = (day, month, year) => {
  const maxDaysGap = day;
  const maxMonthGap = month;
  const maxYearsGap = year;
  const daysGap = getRandomInteger(-maxDaysGap, 1);
  const monthGap = getRandomInteger(-maxMonthGap, 1);
  const yearsGap = getRandomInteger(-maxYearsGap, 0);

  return dayjs()
    .add(daysGap, `day`)
    .add(monthGap, `month`)
    .add(yearsGap, `years`);
};

export const generateFilmCard = () => {
  return {
    filmName: getRandomItem(FILM_NAMES),
    poster: getRandomItem(POSTERS),
    description: generateDiscription(),
    raiting: getRandomInteger(0, 8),
    ageLimit: getRandomItem(AGE_LIMITS),
    year: generateYear(30, 12, 60),
    duration: getRandomInteger(0, 239),
    director: getRandomItem(COMMENTS.author),
    writers: generateArray(COMMENTS.author),
    actors: generateArray(COMMENTS.author),
    country: getRandomItem(COUNTRYS),
    genre: generateArray(GENRES),
    watched: Boolean(getRandomInteger(0, 1)),
    watchList: Boolean(getRandomInteger(0, 1)),
    favorite: Boolean(getRandomInteger(0, 1)),
    comments: {
      emoji: generateArray(COMMENTS.emoji),
      commentDate: generateYear(30, 12, 5, `YYYY/MM/DD HH:MM`),
      author: generateArray(COMMENTS.author),
      text: generateArray(COMMENTS.text),
    },
  };
};

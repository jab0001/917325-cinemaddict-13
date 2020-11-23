import dayjs from 'dayjs';
import {getRandomInteger} from '../utils';


const state = {
  filmName: [
    `Made for each other`,
    `Popeye meets Sinbad`,
    `Sagebrush trail`,
    `Santa claus conquers the martians`,
    `The dance of life`,
    `The great flamarion`,
    `The man with the golden arm`,
  ],
  posters: [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ],
  genre: [
    `action`,
    `cartoon`,
    `comedy`,
    `horror`,
  ],
  ageLimit: [
    `3+`,
    `13+`,
    `16+`,
    `18+`,
  ],
  country: [
    `Russia`,
    `USA`,
    `Germany`,
    `Valhalla`,
  ],
  comments: {
    emoji: [
      `angry.png`,
      `puke.png`,
      `sleeping.png`,
      `smile.png`,
    ],
    author: [
      `Bill`,
      `Maximilian`,
      `Vladilen`,
      `Lex`,
    ],
    text: [
      `hello`,
      `good`,
      `bad`,
      `good day`,
    ],
  }
};

const generateArray = (array) => {
  const randomArray = [];
  const randomNumberComments = getRandomInteger(1, array.length);
  for (let j = 0; j < randomNumberComments; j++) {
    const randomComment = getRandomInteger(0, randomNumberComments - 1);
    randomArray.push(array[randomComment]);
  }

  let unique = [...new Set(randomArray)];
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


const generateForCard = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

const generateYear = (day, month, year, format) => {
  const maxDaysGap = day;
  const maxMonthGap = month;
  const maxYearsGap = year;
  const daysGap = getRandomInteger(-maxDaysGap, 1);
  const monthGap = getRandomInteger(-maxMonthGap, 1);
  const yearsGap = getRandomInteger(-maxYearsGap, 0);

  return dayjs().add(daysGap, `day`).add(monthGap, `month`).add(yearsGap, `years`).format(format);
};

const generateDuration = () => {
  const randomHours = getRandomInteger(0, 2);
  const randomMin = getRandomInteger(0, 59);
  return `${randomHours}h ${randomMin}m`;
};

export const generateFilmCard = () => {
  return {
    filmName: generateForCard(state.filmName),
    poster: generateForCard(state.posters),
    description: generateDiscription(),
    raiting: getRandomInteger(0, 5),
    ageLimit: generateForCard(state.ageLimit),
    year: generateYear(30, 12, 60, `DD MMMM YYYY`),
    duration: generateDuration(),
    director: generateForCard(state.comments.author),
    writers: generateArray(state.comments.author),
    actors: generateArray(state.comments.author),
    country: generateForCard(state.country),
    genre: generateArray(state.genre),
    watched: Boolean(getRandomInteger(0, 1)),
    watchList: Boolean(getRandomInteger(0, 1)),
    favorite: Boolean(getRandomInteger(0, 1)),
    comments: {
      emoji: generateArray(state.comments.emoji),
      commentDate: generateYear(30, 12, 5, `YYYY/MM/DD HH:MM`),
      author: generateArray(state.comments.author),
      text: generateArray(state.comments.text),
    },
  };
};

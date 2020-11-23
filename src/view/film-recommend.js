import {createFilmCardTemplate} from "./film-card";
import {getRandomInteger} from '../utils';

const createCardsForRecommend = (count, filmCard) => {
  let result = ``;
  for (let x = 0; x < count; x++) {
    const randomFilmCard = getRandomInteger(0, filmCard.length - 1);
    result += createFilmCardTemplate(filmCard[randomFilmCard]);
  }
  return result;
};

export const createFilmRecommend = (count, filmCard, title) => {
  return `<section class="films-list films-list--extra">
  <h2 class="films-list__title">${title}</h2>

  <div class="films-list__container">${createCardsForRecommend(count, filmCard)}
  </div>
</section>`;
};

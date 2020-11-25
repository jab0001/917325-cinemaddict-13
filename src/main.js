import {createUserTemplate} from "./view/user";
import {createFilterTemplate} from "./view/filter";
import {createSortTemplate} from "./view/sort";
import {createFilmListTemplate} from "./view/film-list";
import {createFilmCardTemplate} from "./view/film-card";
import {createMoreButton} from "./view/more-button";
import {createFilmRecommend} from "./view/film-recommend";
import {createTotalFilmsTemplate} from "./view/total-films";
import {generateFilmCard} from "./mock/card";
import {generateFilter} from "./mock/filter-films";
import {generateUserStats} from "./mock/user-stats";
/* import {createPopupTemplate} from "./view/popup"; */
import {createStatsTemplate} from "./view/stats";

const MAX_FILMS_CARDS = 20;
const FILMS_COUNT = 5;
const RATED_COUNT = 2;
const TITLE = [`Top rated`, `Most commented`];


const filmCard = new Array(MAX_FILMS_CARDS).fill().map(generateFilmCard);
const filters = generateFilter(filmCard);
const rank = generateUserStats(filmCard, filters);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header__logo`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, createUserTemplate(), `afterend`);
render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmListTemplate(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmListContainer = filmsElement.querySelector(`.films-list__container`);

if (filmCard.length !== 0) {
  for (let i = 0; i < Math.min(filmCard.length, FILMS_COUNT); i++) {
    render(filmListContainer, createFilmCardTemplate(filmCard[i]), `beforeend`);
  }
} else {
  render(filmListContainer, `<h2 class="films-list__title">There are no movies in our database</h2>`, `beforeend`);
}

if (filmCard.length > FILMS_COUNT) {
  render(filmListContainer, createMoreButton(), `afterend`);

  const loadMoreButton = siteBodyElement.querySelector(`.films-list__show-more`);

  let renderedFilmCount = FILMS_COUNT;

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmCard
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT)
      .forEach((card) => render(filmListContainer, createFilmCardTemplate(card), `beforeend`));

    renderedFilmCount += FILMS_COUNT;

    if (renderedFilmCount >= filmCard.length) {
      loadMoreButton.remove();
    }
  });
}

for (let j = 0; j < RATED_COUNT; j++) {
  render(filmsElement, createFilmRecommend(RATED_COUNT, filmCard, TITLE[j]), `beforeend`);
}

render(siteFooterElement, createTotalFilmsTemplate(), `beforeend`);

/* render(siteBodyElement, createPopupTemplate(filmCard[0]), `beforeend`); */ // popup
render(siteBodyElement, createStatsTemplate(rank), `beforeend`); // stats

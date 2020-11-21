import { createUserTemplate } from "./view/user";
import { createFilterTemplate } from "./view/filter";
import { createSortTemplate } from "./view/sort";
import { createFilmListTemplate } from "./view/film-list";
import { createFilmCardTemplate } from "./view/film-card";
import { createMoreButton } from "./view/more-button";
import { createFilmRecommend } from "./view/film-recommend";
import { createTotalFilmsTemplate } from "./view/total-films";
/* import { createPopupTemplate } from "./view/popup"; */
import { createStatsTemplate } from "./view/stats";

const FILMS_COUNT = 5;
const RATED_COUNT = 2;
const TITLE = [`Top rated`, `Most commented`];

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header__logo`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, createUserTemplate(), "afterend");
render(siteMainElement, createFilterTemplate(), "beforeend");
render(siteMainElement, createSortTemplate(), "beforeend");
render(siteMainElement, createFilmListTemplate(), "beforeend");

const filmsElement = siteMainElement.querySelector(".films");
const filmListContainer = filmsElement.querySelector(".films-list__container");

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmListContainer, createFilmCardTemplate(), "beforeend");
}

render(filmListContainer, createMoreButton(), "afterend");

for (let j = 0; j < RATED_COUNT; j++) {
  render(filmsElement, createFilmRecommend(RATED_COUNT, TITLE[j]), "beforeend");
}

render(siteFooterElement,createTotalFilmsTemplate(),"beforeend");

/* render(siteBodyElement, createPopupTemplate(), "beforeend"); */ // popup
/* render(siteBodyElement, createStatsTemplate(), "beforeend"); */ // stats

import UserTemplateView from "./view/user";
import FilterView from "./view/filter";
import TotalFilms from "./view/total-films";
import StatsView from "./view/stats";
import {generateFilmCard} from "./mock/card";
import {generateFilter} from "./mock/filter-films";
import {generateUserStats} from "./mock/user-stats";
import {render, RenderPosition} from "./utils";
import FilmsPresenter from "./presenter/films";

const MAX_FILMS_CARDS = 20;

/* Generate */

const filmCards = Array.from({length: MAX_FILMS_CARDS}, generateFilmCard);
const filters = generateFilter(filmCards);
const rank = generateUserStats(filmCards, filters);

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header__logo`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, new UserTemplateView().getElement(), RenderPosition.AFTER);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

const filmsPresenter = new FilmsPresenter(siteMainElement);
filmsPresenter.init(filmCards);

/* TotalFilms - footer */

render(siteFooterElement, new TotalFilms(MAX_FILMS_CARDS).getElement(), RenderPosition.BEFOREEND);

/* StatsUser - header */

render(siteBodyElement, new StatsView(rank).getElement(), RenderPosition.BEFOREEND); // stats

/* Popup */

/* let filmDetailsElement;

const bindElem = () => {
  filmCardsViews.forEach((elem) => {
    elem.setClickPopupHandler((film) => {
      filmDetailsElement = new PopupView(film);
      render(siteBodyElement, filmDetailsElement.getElement(), RenderPosition.BEFOREEND);
      siteBodyElement.classList.add(`modal-open`);
      siteBodyElement.classList.add(`hide-overflow`);

      filmDetailsElement.setCloseClickHandler(() => {
        filmDetailsElement.getElement().remove();
        siteBodyElement.classList.remove(`modal-open`);
        siteBodyElement.classList.remove(`hide-overflow`);
      });
    });
  });
};
bindElem();


siteBodyElement.addEventListener(`keydown`, (event) => {
  if (event.code === `Escape`) {
    event.preventDefault();
    filmDetailsElement.getElement().remove();
    siteBodyElement.classList.remove(`modal-open`);
    siteBodyElement.classList.remove(`hide-overflow`);
  }
}); */

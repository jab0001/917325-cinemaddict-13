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

render(siteFooterElement, new TotalFilms(filmCards.length).getElement(), RenderPosition.BEFOREEND);

/* StatsUser - header */

render(siteBodyElement, new StatsView(rank).getElement(), RenderPosition.BEFOREEND);

import UserTemplateView from "./view/user";
import TotalFilms from "./view/total-films";
import StatsView from "./view/stats";
import {generateFilmCard} from "./mock/card";
import {generateFilter} from "./mock/filter-films";
import {generateUserStats} from "./mock/user-stats";
import {render, RenderPosition} from "./utils/utils";
import FilmsPresenter from "./presenter/films-presenter";
import FilmsModel from "./model/films-model.js";
import FilterPresenter from "./presenter/filter-presenter";
import FilterModel from "./model/filter-model";

const MAX_FILMS_CARDS = 20;

/* Generate */

const filmCards = Array.from({length: MAX_FILMS_CARDS}, generateFilmCard);
const filters = generateFilter(filmCards);
const rank = generateUserStats(filmCards, filters);

const filmsModel = new FilmsModel();
filmsModel.set(filmCards);

const filterModel = new FilterModel();

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header__logo`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer__statistics`);

const userTemplate = new UserTemplateView();

render(siteHeaderElement, userTemplate, RenderPosition.AFTER);


const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

filterPresenter.init();
filmsPresenter.init();

/* TotalFilms - footer */

const totalFilms = new TotalFilms(filmCards.length);

render(siteFooterElement, totalFilms, RenderPosition.BEFOREEND);

/* StatsUser - footer */

const stats = new StatsView(rank);

render(siteBodyElement, stats, RenderPosition.BEFOREEND);

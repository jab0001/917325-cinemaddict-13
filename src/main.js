import UserTemplateView from "./view/user";
import FilterView from "./view/filter";
import SortView from "./view/sort";
import FilmListView from "./view/film-list";
import FilmCardView from "./view/film-card";
import MoreButtonView from "./view/more-button";
import FilmRecommendView from "./view/film-recommend";
import TotalFilms from "./view/total-films";
import StatsView from "./view/stats";
import EmptyFilmsView from "./view/empty-films";
import PopupView from "./view/popup";
import {generateFilmCard} from "./mock/card";
import {generateFilter} from "./mock/filter-films";
import {generateUserStats} from "./mock/user-stats";
import {render, RenderPosition} from "./utils";

const MAX_FILMS_CARDS = 20;
const FILMS_COUNT = 5;
const RATED_COUNT = 2;
const TITLES = [`Top rated`, `Most commented`];

/* Generate */

const filmCards = Array.from({length: MAX_FILMS_CARDS}, generateFilmCard);
const filters = generateFilter(filmCards);
const rank = generateUserStats(filmCards, filters);
const topRatedFilms = [...filmCards].sort((a, b) => a.raiting < b.raiting ? 1 : -1);
const mostCommentFilms = [...filmCards].sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);
const extraFilms = [topRatedFilms.slice(0, RATED_COUNT), mostCommentFilms.slice(0, RATED_COUNT)];

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header__logo`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer__statistics`);

/* Other Templates */

render(siteHeaderElement, new UserTemplateView().getElement(), RenderPosition.AFTER);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmListView().getElement(), RenderPosition.BEFOREEND);

/* Empty and Films list */

const filmsElement = siteMainElement.querySelector(`.films`);
const filmListContainer = filmsElement.querySelector(`.films-list__container`);

if (filmCards.length !== 0) {
  for (let i = 0; i < Math.min(filmCards.length, FILMS_COUNT); i++) {
    render(filmListContainer, new FilmCardView(filmCards[i]).getElement(), RenderPosition.BEFOREEND);
  }
} else {
  render(filmListContainer, new EmptyFilmsView().getElement(), RenderPosition.BEFOREEND);
}

/* More Cards View Button */

if (filmCards.length > FILMS_COUNT) {
  const loadMoreButton = new MoreButtonView().getElement();

  render(filmListContainer, loadMoreButton, RenderPosition.AFTER);

  let renderedFilmCount = FILMS_COUNT;

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT)
      .forEach((card) => render(filmListContainer, new FilmCardView(card).getElement(), RenderPosition.BEFOREEND));

    renderedFilmCount += FILMS_COUNT;

    if (renderedFilmCount >= filmCards.length) {
      loadMoreButton.remove();
    }
  });
}

/* ExtraFilms */

for (let j = 0; j < RATED_COUNT; j++) {
  const filmRecommend = new FilmRecommendView(TITLES[j]).getElement();
  render(filmsElement, filmRecommend, RenderPosition.BEFOREEND);

  const filmExtra = filmRecommend.querySelector(`.films-list__container`);

  for (let film of extraFilms[j]) {
    render(filmExtra, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND);
  }
}

/* TotalFilms - footer */

render(siteFooterElement, new TotalFilms(MAX_FILMS_CARDS).getElement(), RenderPosition.BEFOREEND);

/* StatsUser - header */

render(siteBodyElement, new StatsView(rank).getElement(), RenderPosition.BEFOREEND); // stats

/* Popup */

const filmsCardsElements = siteBodyElement.querySelector(`.films`);

const getFilmById = (currentId) => {
  const result = filmCards.findIndex((x) => x.id === +currentId);
  return filmCards[result];
};

let filmDetailsElement;
let closePopupButton;

const onFilmsListContainerElementClick = (e) => {
  e.preventDefault();
  if (e.target.tagName !== `IMG`) {
    return;
  }
  const id = e.target.closest(`.film-card`).getAttribute(`data-id`);
  const film = getFilmById(id);
  filmDetailsElement = new PopupView(film).getElement();
  render(siteBodyElement, filmDetailsElement, RenderPosition.BEFOREEND);
  siteBodyElement.classList.add(`modal-open`);
  siteBodyElement.classList.add(`hide-overflow`);

  closePopupButton = filmDetailsElement.querySelector(`.film-details__close-btn`);

  closePopupButton.addEventListener(`click`, onClosePopupButtonClick);
  siteBodyElement.addEventListener(`keydown`, onFilmDetailsPopupKeydown);
};

filmsCardsElements.addEventListener(`click`, onFilmsListContainerElementClick);

const onClosePopupButtonClick = (event) => {
  event.preventDefault();
  filmDetailsElement.remove();
  siteBodyElement.classList.remove(`modal-open`);
  siteBodyElement.classList.remove(`hide-overflow`);
  closePopupButton.removeEventListener(`click`, onClosePopupButtonClick);
};

const onFilmDetailsPopupKeydown = (event) => {
  if (event.code === `Escape`) {
    event.preventDefault();
    filmDetailsElement.remove();
    siteBodyElement.classList.remove(`modal-open`);
    siteBodyElement.classList.remove(`hide-overflow`);
  }
  siteBodyElement.removeEventListener(`keydown`, onFilmDetailsPopupKeydown);
};

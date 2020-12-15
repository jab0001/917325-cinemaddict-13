import SortView from "../view/sort";
import FilmListView from "../view/film-list";
import FilmCardView from "../view/film-card";
import MoreButtonView from "../view/more-button";
import FilmRecommendView from "../view/film-recommend";
import EmptyFilmsView from "../view/empty-films";
import {render, RenderPosition, updateItem, remove, Sort} from "../utils";
import Film from "../presenter/film";
import dayjs from "dayjs";

const FILMS_COUNT = 5;
const RATED_COUNT = 2;
const TITLES = [`Top rated`, `Most commented`];

export default class Films {
  constructor(siteMainContainer) {
    this._siteMainContainer = siteMainContainer;

    this._sortComponent = new SortView();
    this._filmListComponent = new FilmListView();
    this._filmCardComponent = new FilmCardView();
    this._moreButtonComponent = new MoreButtonView();
    this._emptyFilmsComponent = new EmptyFilmsView();
    this._filmRecommendComponent = new FilmRecommendView();

    this._filmPresenter = {};
    this._filmRecommendPresenter = {};

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._setDefaultView = this._setDefaultView.bind(this);
    this._handleSortChange = this._handleSortChange.bind(this);
    this._currentSortType = Sort.DEFAULT;

    this._renderedFilmCount = null;
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();
    this._filmsDefault = filmCards.slice();

    this._renderSort();
    this._renderFilmList();
    this._renderFilmRecommend(this._filmsElement);
  }

  _renderSort() {
    render(this._siteMainContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortChangeHandler(this._handleSortChange);
  }

  _renderFilm(block, film) {
    const renderFilmPresenter = new Film(this._handleFilmChange, this._setDefaultView, block);
    renderFilmPresenter.init(film);
    this._filmPresenter[film.id] = renderFilmPresenter;
  }

  _renderFilmsRecommend(block, film) {
    const renderFilmPresenter = new Film(this._handleFilmChange, this._setDefaultView, block);
    renderFilmPresenter.init(film);
    this._filmRecommendPresenter[film.id] = renderFilmPresenter;
  }

  _renderFilmList() {
    render(this._siteMainContainer, this._filmListComponent, RenderPosition.BEFOREEND);
    this._filmsElement = this._siteMainContainer.querySelector(`.films`);
    const filmListElement = this._filmsElement.querySelector(`.films-list`);
    const filmListContainer = this._filmsElement.querySelector(`.films-list__container`);

    if (this._filmCards.length !== 0) {
      for (let i = 0; i < Math.min(this._filmCards.length, FILMS_COUNT); i++) {
        this._renderFilm(filmListContainer, this._filmCards[i]);
      }
    } else {
      this._renderEmptyFilms(filmListElement);
    }
    this._renderMoreButton(filmListElement, filmListContainer);
  }

  _renderEmptyFilms(filmsElement) {
    render(filmsElement, this._emptyFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderMoreButton(filmsElement, filmListContainer) {
    if (this._filmCards.length > FILMS_COUNT) {
      render(filmsElement, this._moreButtonComponent, RenderPosition.BEFOREEND);

      this._moreButtonComponent.setClickHandler(() => {
        this._filmCards
          .slice(this._renderedFilmCount, this._renderedFilmCount + FILMS_COUNT)
          .forEach((card) => {
            this._renderFilm(filmListContainer, card);
          });

        this._renderedFilmCount += FILMS_COUNT;

        if (this._renderedFilmCount >= this._filmCards.length) {
          this._moreButtonComponent.getElement().remove();
          this._moreButtonComponent.removeElement();
        }
      });
    }
  }

  _renderFilmRecommend(filmsElement) {
    const topRatedFilms = [...this._filmCards].sort((a, b) => a.rating < b.rating ? 1 : -1);
    const mostCommentFilms = [...this._filmCards].sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);
    const extraFilms = [topRatedFilms.slice(0, RATED_COUNT), mostCommentFilms.slice(0, RATED_COUNT)];

    for (let j = 0; j < RATED_COUNT; j++) {
      const filmRecommend = new FilmRecommendView(TITLES[j]).getElement();
      render(filmsElement, filmRecommend, RenderPosition.BEFOREEND);

      const filmExtra = filmRecommend.querySelector(`.films-list__container`);

      for (let film of extraFilms[j]) {
        this._renderFilmsRecommend(filmExtra, film);
      }
    }
  }

  _handleFilmChange(updateFilm) {
    this._filmCards = updateItem(this._filmCards, updateFilm);
    if (this._filmPresenter[updateFilm.id]) {
      this._filmPresenter[updateFilm.id].init(updateFilm);
    }
    if (this._filmRecommendPresenter[updateFilm.id]) {
      this._filmRecommendPresenter[updateFilm.id].init(updateFilm);
    }
  }

  _setDefaultView() {
    Object.values(this._filmPresenter).forEach((presenter) => {
      presenter.closePopup();
    });
    Object.values(this._filmRecommendPresenter).forEach((presenter) => {
      presenter.closePopup();
    });
  }

  _handleSortChange(sort) {
    if (this._currentSortType === sort) {
      return;
    }
    this._renderSortedFilms(sort);
    this._clearList();
    this._renderFilmList();
  }

  _renderSortedFilms(sort) {
    switch (sort) {
      case Sort.DATE:
        this._filmCards.sort(function (a, b) {
          return dayjs(b.year).diff(dayjs(a.year));
        });
        break;
      case Sort.RATING:
        this._filmCards.sort(function (a, b) {
          return b.rating - a.rating;
        }).slice();
        break;
      default:
        this._filmCards = this._filmsDefault.slice();
    }

    this._currentSortType = sort;
  }

  _clearList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILMS_COUNT;
    remove(this._moreButtonComponent);
  }
}

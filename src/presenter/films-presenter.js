import SortView from "../view/sort";
import FilmListView from "../view/film-list";
import FilmCardView from "../view/film-card";
import MoreButtonView from "../view/more-button";
import FilmRecommendView from "../view/film-recommend";
import EmptyFilmsView from "../view/empty-films";
import {render, RenderPosition, remove, Sort, UserAction, UpdateType} from "../utils/utils";
import FilmPresenter from "./film-presenter";
import dayjs from "dayjs";
import {filter} from "../utils/filter";

const FILMS_COUNT = 5;
const RATED_COUNT = 2;
const TITLES = [`Top rated`, `Most commented`];

export default class FilmsPresenter {
  constructor(siteMainContainer, filmsModel, filterModel) {
    this._siteMainContainer = siteMainContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;

    this._sortComponent = new SortView();
    this._filmListComponent = new FilmListView();
    this._filmCardComponent = new FilmCardView();
    this._moreButtonComponent = new MoreButtonView();
    this._emptyFilmsComponent = new EmptyFilmsView();
    this._filmRecommendComponent = new FilmRecommendView();

    this._filmPresenter = {};
    this._filmRecommendPresenter = {};

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._setDefaultView = this._setDefaultView.bind(this);
    this._handleSortChange = this._handleSortChange.bind(this);
    this._currentSortType = Sort.DEFAULT;

    this._renderedFilmCount = FILMS_COUNT;

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderMain(this._siteMainContainer);
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const movies = this._filmsModel.get();
    const filteredMovies = filter[filterType](movies);

    switch (this._currentSortType) {
      case Sort.DATE: {
        return filteredMovies.sort(function (a, b) {
          return dayjs(b.year).diff(dayjs(a.year));
        });
      }
      case Sort.RATING: {
        return filteredMovies.sort(function (a, b) {
          return b.rating - a.rating;
        });
      }
    }

    return filteredMovies;
  }

  _renderMain(container) {
    if (this._getFilms().length === 0) {
      this._renderEmptyFilms(container);

      return;
    }
    this._renderSort();
    this._renderFilmList();
    this._renderFilmRecommend(this._filmsElement);
  }

  _renderSort() {
    render(this._siteMainContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortChangeHandler(this._handleSortChange);
  }

  _renderFilm(block, film) {
    const renderFilmPresenter = new FilmPresenter(this._handleViewAction, this._setDefaultView, block);
    renderFilmPresenter.init(film);
    this._filmPresenter[film.id] = renderFilmPresenter;
  }

  _renderFilmsRecommend(block, film) {
    const renderFilmPresenter = new FilmPresenter(this._handleViewAction, this._setDefaultView, block);
    renderFilmPresenter.init(film);
    this._filmRecommendPresenter[film.id] = renderFilmPresenter;
  }

  _renderFilmList() {
    render(this._siteMainContainer, this._filmListComponent, RenderPosition.BEFOREEND);
    this._filmsElement = this._siteMainContainer.querySelector(`.films`);
    const filmListElement = this._filmsElement.querySelector(`.films-list`);
    const filmListContainer = this._filmsElement.querySelector(`.films-list__container`);

    const films = this._getFilms();

    films.slice(0, Math.min(films.length, this._renderedFilmCount)).forEach((film) => this._renderFilm(filmListContainer, film));

    if (films.length > FILMS_COUNT) {
      this._renderMoreButton(filmListElement, filmListContainer);
    }
  }

  _renderEmptyFilms(filmsElement) {
    render(filmsElement, this._emptyFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderMoreButton(filmsElement, filmListContainer) {
    render(filmsElement, this._moreButtonComponent, RenderPosition.BEFOREEND);

    this._moreButtonComponent.setClickHandler(() => {
      const filmCount = this._getFilms().length;
      const newFilmCount = Math.min(filmCount, this._renderedFilmCount + FILMS_COUNT);

      this._getFilms()
        .slice(this._renderedFilmCount, newFilmCount)
        .forEach((card) => {
          this._renderFilm(filmListContainer, card);
        });

      this._renderedFilmCount += FILMS_COUNT;

      if (this._renderedFilmCount >= filmCount) {
        remove(this._moreButtonComponent);
      }
    });
  }

  _renderFilmRecommend(filmsElement) {
    const films = this._getFilms();
    const topRatedFilms = [...films].sort((a, b) => a.rating < b.rating ? 1 : -1);
    const mostCommentFilms = [...films].sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);
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

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE: {
        this._filmsModel.update(updateType, update);
        break;
      }
      case UserAction.DELETE_COMMENT: {
        this._filmsModel.update(updateType, update);
        break;
      }
      case UserAction.ADD_COMMENT: {
        this._filmsModel.update(updateType, update);
        break;
      }
    }
  }

  _handleModelEvent(updateType, update) {
    switch (updateType) {
      case UpdateType.PATCH: {
        this._updateFilm(update);
        break;
      }
      case UpdateType.MINOR: {
        this._clearBoard();
        this._renderMain(this._siteMainContainer);
        break;
      }
      case UpdateType.MAJOR: {
        this._clearBoard(true, true);
        this._renderMain(this._siteMainContainer);
        break;
      }
    }
  }

  _updateFilm(updateFilm) {
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
    if (sort === this._currentSortType) {
      return;
    }

    this._currentSortType = sort;
    this._clearList();
    this._renderFilmList();
  }

  _clearList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    remove(this._moreButtonComponent);
  }

  _clearRecommendList() {
    Object
      .values(this._filmRecommendPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmRecommendPresenter = {};
    remove(this._filmRecommendComponent);
  }

  _clearBoard(resetRenderedFilmsCount = false, resetSort = false) {
    this._clearList();
    this._clearRecommendList();

    if (resetRenderedFilmsCount) {
      this._renderedFilmCount = FILMS_COUNT;
    } else {
      this._renderedFilmCount = Math.min(this._getFilms().length, this._renderedFilmCount);
    }

    if (resetSort) {
      this._currentSortType = Sort.DEFAULT;
    }
  }
}

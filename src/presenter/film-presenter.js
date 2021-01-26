import FilmCard from "../view/film-card.js";
import Popup from "../view/popup.js";

import {render, RenderPosition, remove, replace, UserAction, UpdateType} from "../utils/utils.js";

const bodyElement = document.querySelector(`body`);

export default class FilmPresenter {
  constructor(changeData, viewChange, container, films) {
    this._filmsModel = films;
    this._filmListElement = container;
    this._changeData = changeData;
    this._viewChange = viewChange;
    this._onOpenPopup = this._onOpenPopup.bind(this);
    this._onClosePopup = this._onClosePopup.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._filmComponent = null;
    this._handlerFavoriteClick = this._handlerFavoriteClick.bind(this);
    this._handlerWatchlistClick = this._handlerWatchlistClick.bind(this);
    this._handlerWatchedlistClick = this._handlerWatchedlistClick.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilm = this._filmComponent;
    this._filmComponent = new FilmCard(this._film);
    this._filmComponent.setClickPopupHandler(this._onOpenPopup);
    this._filmComponent.setWatchedlistClickHandler(this._handlerWatchedlistClick);
    this._filmComponent.setWatchlistClickHandler(this._handlerWatchlistClick);
    this._filmComponent.setFavoriteClickHandler(this._handlerFavoriteClick);

    if (prevFilm === null) {
      render(this._filmListElement, this._filmComponent, RenderPosition.BEFOREEND);
    } else if (this._filmListElement.contains(prevFilm.getElement())) {
      replace(this._filmComponent, prevFilm);
    }
  }

  destroy() {
    remove(this._filmComponent);
  }

  _onOpenPopup() {
    this._viewChange();
    this._popup = new Popup(this._film, this._filmsModel);

    bodyElement.classList.add(`hide-overflow`);
    bodyElement.appendChild(this._popup.getElement());
    this._popup.setCloseClickHandler(this._onClosePopup);
    this._popup.setWatchedlistClickHandler(this._handlerWatchedlistClick);
    this._popup.setWatchlistClickHandler(this._handlerWatchlistClick);
    this._popup.setFavoriteClickHandler(this._handlerFavoriteClick);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(escEvt) {
    if (escEvt.key === `Escape` || escEvt.key === `Esc`) {
      escEvt.preventDefault();
      bodyElement.classList.remove(`hide-overflow`);
      bodyElement.removeChild(this._popup.getElement());
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._filmComponent.setClickPopupHandler(this._onOpenPopup);
      this._popup = null;
    }
  }

  closePopup() {
    this._onClosePopup();
  }

  _onClosePopup() {
    if (this._popup) {
      bodyElement.classList.remove(`hide-overflow`);
      bodyElement.removeChild(this._popup.getElement());
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._filmComponent.setClickPopupHandler(this._onOpenPopup);
      this._popup = null;
    }
  }

  _handlerFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              favorite: !this._film.favorite
            }
        )
    );

  }

  _handlerWatchlistClick() {
    this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              watchList: !this._film.watchList
            }
        )
    );
  }

  _handlerWatchedlistClick() {
    this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              watched: !this._film.watched
            }
        )
    );
  }
}

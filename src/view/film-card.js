import {createElement, resultHoursMins} from "../utils";

const createFilmCardTemplate = (filmCard) => {
  const {filmName, poster, description, raiting, genre, comments, year, duration, watched, watchList, favorite, id} = filmCard;
  const durations = resultHoursMins(duration);
  return `<article class="film-card" data-id=${id}>
  <h3 class="film-card__title">${filmName}</h3>
  <p class="film-card__rating">${raiting}</p>
  <p class="film-card__info">
    <span class="film-card__year">${new Date(year).getFullYear()}</span>
    <span class="film-card__duration">${durations[0]}h ${durations[1]}m</span>
    <span class="film-card__genre">${genre[0]}</span>
  </p>
  <img src="./images/posters/${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item${watchList ? `--active` : ``}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item${watched ? `--active` : ``}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item${favorite ? `--active` : ``}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCard {
  constructor(filmCard) {
    this._element = null;
    this._filmCard = filmCard;
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCard);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

}

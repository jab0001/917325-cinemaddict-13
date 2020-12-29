import dayjs from "dayjs";
import durations from 'dayjs/plugin/duration';
/* import {resultHoursMins} from "../utils"; */
import SmartView from "./smart";

dayjs.extend(durations);

const createGenres = (el) => {
  return el.map((item) => {
    return `<span class="film-details__genre">${item}</span>`;
  }).join(` `);
};

const createComments = (comments) => {
  return comments.map((el) => {
    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${el.emoji}" width="55" height="55" alt="${el.emoji ? el.emoji : `no imoji`}">
    </span>
    <div>
      <p class="film-details__comment-text">${el.text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${el.author}</span>
        <span class="film-details__comment-day">${el.commentDate}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  }).join(` `);
};

const createPopupTemplate = (data, text, emoji) => {
  const {
    poster,
    filmName,
    rating,
    genre,
    description,
    comments,
    ageLimit,
    year,
    duration,
    director,
    writers,
    actors,
    country,
    watchList,
    watched,
    favorite
  } = data;
  /* const durations = resultHoursMins(duration); */

  const renderEmogi = (emogi) => {
    const result = emogi ?
      `<span><img src="./images/emoji/${emogi}" width="55" height="55" alt="${emogi}"></span>` : ``;
    return result;
  };

  const renderText = (message) => {
    const result = message ? `${message}` : ``;
    return result;
  };

  const getDuration = dayjs.duration(duration, `minutes`);

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${poster.replace(/\.[^.]+$/, ``)}">

          <p class="film-details__age">${ageLimit}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmName}</h3>
              <p class="film-details__title-original">Original: ${filmName}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dayjs(year).format(`DD MMMM YYYY`)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${getDuration.hours()}h ${getDuration.minutes()}m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
              ${createGenres(genre)}
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchList ? ` checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watched ? ` checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite ? ` checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
        ${createComments(comments)}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${renderEmogi(emoji)}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${renderText(text)}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class Popup extends SmartView {
  constructor(film) {
    super();
    this._data = film;
    this._text = ``;
    this._emoji = ``;

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._onWatchedlistClick = this._onWatchedlistClick.bind(this);
    this._onWatchlistClick = this._onWatchlistClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._messageToggleHandler = this._messageToggleHandler.bind(this);

    this._messageInputHandler = this._messageInputHandler.bind(this);
    this._smileChangeHandler = this._smileChangeHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._data, this._text, this._emoji);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedlistClickHandler(this._callback.watchedlistClick);
  }

  _setInnerHandlers() {
    this.getElement().querySelectorAll(`.film-details__emoji-label img`)
    .forEach((item) => item.addEventListener(`click`, this._smileChangeHandler));
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._messageInputHandler);
    document.addEventListener(`keydown`, this._messageToggleHandler);
  }

  _messageInputHandler(evt) {
    evt.preventDefault();
    this._text = evt.target.value;
  }

  _smileChangeHandler(evt) {
    evt.preventDefault();
    this._emoji = evt.target.src.replace(/(.+)\/(.+)$/, `$2`);
    this.updateData(this._data);
  }

  _messageToggleHandler(evt) {
    this._currentEmoji = this._emoji ? this._emoji : ``;
    this._currentText = this._text ? this._text : ``;
    if (evt.key === `Enter`) {
      const newComment = {
        text: this._currentText,
        emoji: this._currentEmoji,
        commentDate: dayjs().format(`YYYY/MM/DD HH:mm`),
        author: `Anonymous`
      };
      document.removeEventListener(`keydown`, this._messageToggleHandler);
      this.updateData({
        comments: [...this._data.comments, newComment]
      });
    }
    /* console.log(this._data); */

  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeClickHandler);
  }


  _onFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`input[name="favorite"]`).addEventListener(`change`, this._onFavoriteClick);

  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`input[name="watchlist"]`).addEventListener(`change`, this._onWatchlistClick);
  }

  _onWatchlistClick(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  setWatchedlistClickHandler(callback) {
    this._callback.watchedlistClick = callback;
    this.getElement().querySelector(`input[name="watched"`).addEventListener(`change`, this._onWatchedlistClick);
  }

  _onWatchedlistClick(evt) {
    evt.preventDefault();
    this._callback.watchedlistClick();
  }
}

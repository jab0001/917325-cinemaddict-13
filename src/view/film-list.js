import FormulaicView from "./formulaic";

const createFilmListTemplate = () => {
  return `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container">
    </div>

  </section>
</section>`;
};

const getFilmById = (currentId, filmCards) => {
  const result = filmCards.findIndex((x) => x.id === +currentId);
  return filmCards[result];
};

export default class FilmList extends FormulaicView {
  constructor(filmCards) {
    super();
    this._filmCards = filmCards;
    this._clickPopupHandler = this._clickPopupHandler.bind(this);
  }

  getTemplate() {
    return createFilmListTemplate();
  }

  _clickPopupHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `IMG`) {
      return;
    }
    const id = evt.target.closest(`.film-card`).getAttribute(`data-id`);
    const film = getFilmById(id, this._filmCards);
    this._callback.clickPopup(film);
  }

  setClickPopupHandler(callback) {
    this._callback.clickPopup = callback;
    this.getElement().addEventListener(`click`, this._clickPopupHandler);
  }
}

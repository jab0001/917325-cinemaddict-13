import Observer from "../utils/observer";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  set(films) {
    this._films = films.slice();
  }

  get() {
    return this._films;
  }

  update(updateType, update) {
    const index = this._films.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting movie`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't add comment to unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];
    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];
    this._notify(updateType, update);
  }

  getFilm(id) {
    const index = this._films.findIndex((film) => film.id === id);

    if (index === -1) {
      throw new Error(`Can't find an unexisting film`);
    }
    return this._films[index];
  }
}

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
}

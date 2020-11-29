import {createElement} from "../utils";

const createTotalFilmsTemplate = (total) => {
  return `<p>${total} movies inside</p>`;
};

export default class TotalFilms {
  constructor(total) {
    this._element = null;
    this._total = total;
  }

  getTemplate() {
    return createTotalFilmsTemplate(this._total);
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

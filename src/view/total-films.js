import FormulaicView from "./formulaic";

const createTotalFilmsTemplate = (total) => {
  return `<p>${total} movies inside</p>`;
};

export default class TotalFilms extends FormulaicView {
  constructor(total) {
    super();
    this._total = total;
  }

  getTemplate() {
    return createTotalFilmsTemplate(this._total);
  }
}

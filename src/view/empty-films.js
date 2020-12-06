import FormulaicView from "./formulaic";

const createEmptyFilmsTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class EmptyFilms extends FormulaicView {
  getTemplate() {
    return createEmptyFilmsTemplate();
  }
}

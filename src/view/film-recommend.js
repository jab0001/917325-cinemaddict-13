import FormulaicView from "./formulaic";


const createFilmRecommend = (title) => {
  return `<section class="films-list films-list--extra">
  <h2 class="films-list__title">${title}</h2>

  <div class="films-list__container">
  </div>
</section>`;
};

export default class FilmRecommend extends FormulaicView {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createFilmRecommend(this._title);
  }
}

import FormulaicView from "./formulaic";
import {Sort} from "../utils/utils";

const createSortTemplate = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-sort="${Sort.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort="${Sort.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort="${Sort.RATING}">Sort by rating</a></li>
</ul>`;
};

export default class SiteMenu extends FormulaicView {
  constructor() {
    super();
    this._sortChangeHandler = this._sortChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortChangeHandler(callback) {
    this._callback.sortChangeHandler = callback;
    this.getElement().addEventListener(`click`, this._sortChangeHandler);
  }

  _clearActiveClass() {
    const buttons = this.getElement().querySelectorAll(`.sort__button`);
    buttons.forEach((button) => {
      button.classList.remove(`sort__button--active`);
    });
  }

  _sortChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    /* console.log(evt.target.dataset.sort); */
    this._clearActiveClass();
    evt.target.classList.add(`sort__button--active`);
    this._callback.sortChangeHandler(evt.target.dataset.sort);
  }
}

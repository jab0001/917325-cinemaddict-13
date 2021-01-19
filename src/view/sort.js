import FormulaicView from "./formulaic";
import {Sort} from "../utils/utils";

const createSortItemTemplate = (sortType, currentSortType) => {
  return `<li>
    <a href="#"
      class="sort__button ${currentSortType === sortType ? `sort__button--active` : ``}"
      data-sort="${sortType}"
    >Sort by ${sortType}</a>
  </li>`;
};

const createSortTemplate = (currentSortType) => {
  const sortItemsTemplate = Object
    .values(Sort)
    .map((sortType) => createSortItemTemplate(sortType, currentSortType))
    .join(`\n`);

  return `<ul class="sort">
    ${sortItemsTemplate}
  </ul>`;
};

export default class SiteMenu extends FormulaicView {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;
    this._sortChangeHandler = this._sortChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  setSortChangeHandler(callback) {
    this._callback.sortChangeHandler = callback;
    this.getElement().addEventListener(`click`, this._sortChangeHandler);
  }

  _sortChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._callback.sortChangeHandler(evt.target.dataset.sort);
  }
}

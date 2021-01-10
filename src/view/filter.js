import {FilterName} from "../utils/utils";
import FormulaicView from "./formulaic";
import {firstLetterCaps} from "../utils/utils";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {name, count} = filter;

  const countTemplate = filter.name !== FilterName.ALL_MOVIES ?
    `<span class="main-navigation__item-count">${count}</span>` :
    ``;

  const activeClassTemplate = (currentFilterType === name) ?
    `main-navigation__item--active` :
    ``;

  return `<a
    href="#${name}"
    class="main-navigation__item ${activeClassTemplate}"
    data-type="${name}"
  >${firstLetterCaps(name)} ${countTemplate}</a>`;
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join(`\n`);

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${filterItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class FilmList extends FormulaicView {
  constructor(filter, currentFilterType) {
    super();

    this._filter = filter;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filter, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._callback.filterTypeChange(evt.target.dataset.type);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}

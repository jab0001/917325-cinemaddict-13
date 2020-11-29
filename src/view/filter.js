import {firstLetterCaps} from '../utils';
import {createElement} from "../utils";

const createFilters = (filters) => {
  let result = ``;
  for (let x = 0; x < filters.length; x++) {
    if (filters[x].name === `all`) {
      result += `<a href="#${filters[x].name}" class="main-navigation__item">${firstLetterCaps(filters[x].name)} movies </a>`;
    } else {
      result += `<a href="#${filters[x].name}" class="main-navigation__item">${firstLetterCaps(filters[x].name)} <span class="main-navigation__item-count">${filters[x].count}</span></a>`;
    }
  }
  return result;
};

const createFilterTemplate = (filter) => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${createFilters(filter)}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class FilmList {
  constructor(filter) {
    this._element = null;
    this._filter = filter;
  }

  getTemplate() {
    return createFilterTemplate(this._filter);
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

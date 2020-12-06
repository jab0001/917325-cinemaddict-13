import {firstLetterCaps} from '../utils';
import FormulaicView from "./formulaic";

const createFilters = (filters) => {
  return filters.map((el) => {
    return el.name === `all` ? `<a href="#${el.name}" class="main-navigation__item">${firstLetterCaps(el.name)} movies </a>` : `<a href="#${el.name}" class="main-navigation__item">${firstLetterCaps(el.name)} <span class="main-navigation__item-count">${el.count}</span></a>`;
  }).join(` `);
};

const createFilterTemplate = (filter) => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${createFilters(filter)}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class FilmList extends FormulaicView {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    return createFilterTemplate(this._filter);
  }
}

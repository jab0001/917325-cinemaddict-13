import {firstLetterCaps} from '../utils';

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

export const createFilterTemplate = (filter) => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${createFilters(filter)}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

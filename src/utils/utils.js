import dayjs from "dayjs";
import Formulaic from "../view/formulaic";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const resultHoursMins = (mins) => {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return [hours, minutes];
};

export const RenderPosition = {
  AFTER: `after`,
  BEFOREEND: `beforeend`
};

export const render = (container, child, place) => {
  if (container instanceof Formulaic) {
    container = container.getElement();
  }

  if (child instanceof Formulaic) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const generateYear = (day, month, year, format) => {
  const maxDaysGap = day;
  const maxMonthGap = month;
  const maxYearsGap = year;
  const daysGap = getRandomInteger(-maxDaysGap, 1);
  const monthGap = getRandomInteger(-maxMonthGap, 1);
  const yearsGap = getRandomInteger(-maxYearsGap, 0);

  return dayjs()
    .add(daysGap, `day`)
    .add(monthGap, `month`)
    .add(yearsGap, `years`)
    .format(format);
};

export const getRandomItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

export const remove = (component) => {
  if (!(component instanceof Formulaic)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Formulaic) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Formulaic) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const Sort = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const UserAction = {
  UPDATE_MOVIE: `UPDATE_MOVIE`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterName = {
  ALL_MOVIES: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

export const firstLetterCaps = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const firstLetterCaps = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
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

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTER:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const createFilmCardTemplate = (filmCard) => {
  const {filmName, poster, description, raiting, genre, comments, year, duration} = filmCard;
  const yearCard = year.slice(-4);
  return `<article class="film-card">
  <h3 class="film-card__title">${filmName}</h3>
  <p class="film-card__rating">${raiting}</p>
  <p class="film-card__info">
    <span class="film-card__year">${yearCard}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre[0]}</span>
  </p>
  <img src="./images/posters/${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${comments.text.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
  </div>
</article>`;
};

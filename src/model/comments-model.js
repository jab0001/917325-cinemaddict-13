import Observer from "../utils/observer";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = {};
  }

  setComments(_comments) {
    if (!_comments) {
      return;
    }
    this._comments = Object.assign(
        {},
        _comments
    );
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't add comment to unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];
    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];
    this._notify(updateType, update);
  }
}

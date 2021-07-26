export default class Section {
  constructor({ renderer, containerSelector }) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
  }

  setItems(card) {
      this._container.prepend(card);
  }

  clear() {
      this._container.innerHTML = "";
  }

  renderItems(items) {
      this.clear();

      items.forEach((item) => {
          this._renderer(item);
      });
  }
}
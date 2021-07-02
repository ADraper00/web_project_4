import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    this._popup.querySelector(".popup__caption").textContent = name;
    this._popup.querySelector(".popup__image").src = link;
    super.open();
  }
}

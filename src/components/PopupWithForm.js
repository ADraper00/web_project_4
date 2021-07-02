import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {
    const inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    const form = this._popup.querySelector(".popup__form");
    form.reset();
  }
}
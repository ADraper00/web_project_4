import { openPopup, imagePreview, popupImage, popupImageCaption } from "./index.js";

class Card {
    constructor(card, templateSelector, popupHandler) {
        this._name = card.name;
        this._link = card.link;
        this._templateSelector = templateSelector;
        this._openPopup = popupHandler;
    }

    _openPreview(evt) {
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupImageCaption.textContent = this._name;
        this._openPopup(imagePreview);
    }

    _deletePlace(evt) {
        evt.target.parentElement.remove();
    }

    _toggleLike(evt) {
        evt.target.classList.toggle("card__heart_liked");
    }

    _setEventListeners() {
        this._deleteButton = this._newPlace.querySelector(".card__delete");
        this._deleteButton.addEventListener("click", (evt) => this._deletePlace(evt));

        this._likeButton = this._newPlace.querySelector(".card__heart");
        this._likeButton.addEventListener("click", (evt) => this._toggleLike(evt));

        this._placeImage = this._newPlace.querySelector(".card__image");
        this._placeImage.addEventListener("click", (evt) => this._openPreview(evt));
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true);
        return cardElement;
    }

    createCard() {
        this._newPlace = this._getTemplate();
        this._setEventListeners();

        this._newPlace.querySelector(".card__title").textContent = this._name;
        this._placeImage.src = this._link;
        this._placeImage.alt = `${this._name}`;
        return this._newPlace;
    }
}
export Card;
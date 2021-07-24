export default class Card {
  constructor({ card, handleCardClick, handleDeleteClick, userData, handleLikeCard, templateSelector }) {
    this._name = card.name;
    this._link = card.link;
    this._likedData = card.likes;
    this._timesLiked = card.likes.length;
    this._id = card._id;
    this._creatorName = card.owner.name;
    this._creatorId = card.owner._id;
    this._user = userData._id;
    this._openPopup = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._templateSelector = templateSelector;
    this._handleLikeCard = handleLikeCard;
  }

  _toggleLikeStatus(evt) {
    // card has not been liked yet
    this._handleLikeCard(!evt.target.classList.contains('card__heart_liked'))
      .then(card => {
        evt.target.classList.toggle('card__heart_liked');
        this._updateDisplayedLikes(evt, card);
      })
      .catch(err => console.error(err));
  }

  _updateDisplayedLikes(e, card) {
    const displayedLikesElement = this._newPlace.querySelector('.card__likes');
    displayedLikesElement.textContent = card.likes.length;
  }

  _setEventListeners() {
    this._deleteButton = this._newPlace.querySelector('.card__delete');
    if (!(this._creatorId === this._user)) {
      this._deleteButton.remove();
    } else {
      this._deleteButton.addEventListener('click', evt => {
        this._handleDeleteClick(evt);
      });
    }

    this._likeButton = this._newPlace.querySelector('.card__heart');
    this._likeButton.addEventListener('click', evt => {
      this._toggleLikeStatus(evt);
    });

    this._placeImage = this._newPlace.querySelector('.card__image');
    this._placeImage.addEventListener('click', () => {
      this._openPopup(this._name, this._link);
    });
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _setLikedStatus() {
    this._newPlace.querySelector('.card__likes').textContent = this._timesLiked;
    const userHasLiked = this._likedData.some(likes => likes._id === this._user);
    if (userHasLiked) {
      this._newPlace.querySelector('.card__heart').classList.add('card__heart_liked');
    }
  }

  createCard() {
    this._newPlace = this._getTemplate();
    this._setEventListeners();

    this._newPlace.querySelector('.card__title').textContent = this._name;
    this._placeImage.src = this._link;
    this._placeImage.alt = `${this._name}`;
    this._setLikedStatus();

    return this._newPlace;
  }
}

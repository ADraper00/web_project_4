export default class Card { 
  constructor({ item, handleCardClick }, templateSelector) { 
    this._name = item.name; 
    this._link = item.link; 
    this._openPopup = handleCardClick; 
    this._templateSelector = templateSelector; 
  } 
 
  _deletePlace(evt) { 
    evt.target.parentElement.remove(); 
  } 
 
  _toggleLike(evt) { 
    evt.target.classList.toggle("card__heart_liked"); 
  } 
 
  _setEventListeners() { 
    this._deleteButton = this._newPlace.querySelector(".card__delete"); 
    this._deleteButton.addEventListener("click", (evt) => { 
      this._deletePlace(evt); 
    }); 
 
    this._likeButton = this._newPlace.querySelector(".card__heart"); 
    this._likeButton.addEventListener("click", (evt) => { 
      this._toggleLike(evt); 
    }); 
 
    this._placeImage = this._newPlace.querySelector(".card__image"); 
    this._placeImage.addEventListener("click", () => { 
      this._openPopup(this._name, this._link); 
    }); 
  } 
 
  _getTemplate() { 
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true); 
    return cardElement; 
  } 
 
  generateCard() { 
    this._newPlace = this._getTemplate(); 
    this._setEventListeners(); 
    this._newPlace.querySelector(".card__title").textContent = this._name; 
    this._placeImage.src = this._link; 
    this._placeImage.alt = `${this._name}`; 
    return this._newPlace; 
  } 
} 
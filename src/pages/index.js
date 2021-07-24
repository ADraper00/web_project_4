import "../pages/index.css";
import Api from "../components/Api.js"
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDelete from "../components/PopupDelete.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, placesContainerSelector, editButton, profileEditorForm, avatarUpdateForm, avatarButton, addButton, imageAdderForm, popupName, popupTitle, settings, profileNameElement, profileAboutElement, profileAvatarElement 
} from "../utils/constants.js";

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  authorization: "9b815c88-30e1-42fa-b363-04c78bf0d633",
});

const addPlaceValidation = new FormValidator(settings, imageAdderForm);
const profileValidation = new FormValidator(settings, profileEditorForm);
const avatarValidation = new FormValidator(settings, avatarUpdateForm);

profileValidation.enableValidation();
addPlaceValidation.enableValidation();
avatarValidation.enableValidation();

const userInfo = new UserInfo({
  nameElement: profileNameElement,
  aboutElement: profileAboutElement,
  avatarElement: profileAvatarElement,
});

const confirmDeletePopup = new PopupDelete({
  popupSelector: '.popup_role_delete',
  formSubmitHandler: (cardElement, cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        confirmDeletePopup.close();
      })
      .catch(err => console.error(`Problem deleting card: ${err}`));
  },
});

const createNewCard = function (item) {
  return new Card({
    card: item,
    handleCardClick: (name, link) => {
      imagePreviewPopup.open(name, link);
    },
    handleDeleteClick: evt => {
      confirmDeletePopup.open(evt, item._id);
    },
    userData: userInfo.getUserInfo(),
    handleLikeCard: status => {
      return status ? api.likeCard(item._id) : api.removeLike(item._id);
    },
    templateSelector: '#place-template',
  });
};
 
  const placeCards = new Section({
  
     renderer: item => {
        const newCard = createNewCard(item);
        placeCards.setItems(newCard.createCard());
      },
      containerSelector: placesContainerSelector,

    })

// initialize image preview popup
const imagePreviewPopup = new PopupWithImage('.popup_role_image');

// initialize profile editor popup
const profileEditor = new PopupWithForm({
  popupSelector: '.popup_role_edit',
  formSubmitHandler: data => {
    api
      .updateProfile(data)
      .then(() => {
        userInfo.updateUserInfo(data);
        userInfo.renderUserInfo();
        profileEditor.close();
      })
      .catch(err => console.error(`Problem updating profile: ${err}`));
  },
});

// initialize image adder editor popup
const imageAdderPopup = new PopupWithForm({
  popupSelector: '.popup_role_add',
  formSubmitHandler: data => {
    api
      .addCard(data)
      .then(cardData => {
        const newCard = createNewCard(cardData);
        placeCards.setItems(newCard.createCard());
      })
      .then(() => imageAdderPopup.close())
      .catch(err => console.error(`Problem adding card: ${err}`));
  },
});

// initialize  avatar update popup
const avatarUpdatePopup = new PopupWithForm({
  popupSelector: '.popup_role_avatar',
  formSubmitHandler: data => {
    userInfo.removeAvatar(); // displays loading effect while server responds
    api
      .updateAvatar(data)
      .then(() => {
        userInfo.updateUserInfo(data);
        userInfo.renderUserInfo();
        avatarUpdatePopup.close();
      })
      .catch(err => console.error(`Problem updating avatar: ${err}`));
  },
});


confirmDeletePopup.setEventListeners();
imagePreviewPopup.setEventListeners();
profileEditor.setEventListeners();
imageAdderPopup.setEventListeners();
avatarUpdatePopup.setEventListeners();

// set event listeners to page buttons
editButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  popupName.value = name;
  popupTitle.value = about;
  profileValidation.toggleButtonState();
  profileEditor.open();
});

addButton.addEventListener('click', () => {
  imageAdderPopup.open();
  addPlaceValidation.toggleButtonState();
});

avatarButton.addEventListener('click', () => {
  avatarUpdatePopup.open();
  avatarValidation.toggleButtonState();
});


 
  api.getUserInfo()
  .then(userData => {
    userInfo.updateUserInfo(userData);
  })
  
  .then((res) => {
    api.getGroupCards()
    .then(fetchedCards => {
      placeCards.renderItems(fetchedCards.reverse());
    });
  })
 
  .then(() => {
    userInfo.renderUserInfo(); 
   })
  .catch(err => console.error(`Problem rendering content: ${err}`));
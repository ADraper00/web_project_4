import "./pages/index.css";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import FormValidator from "./components/FormValidator.js";
import { settings, placesContainer, editButton, profileEditorForm, addButton, imageAdderForm, profileName, profileTitle, popupName, popupTitle, initialCards } from "./utils/constants.js";

const addPlaceValidation = new FormValidator(settings, imageAdderForm);
const profileValidation = new FormValidator(settings, profileEditorForm);

profileValidation.enableValidation();
addPlaceValidation.enableValidation();

const imagePreviewPopup = new PopupWithImage(".popup_role_image");
imagePreviewPopup.setEventListeners();

const placeCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newPlace = new Card(
        {
          card: item,
          handleCardClick: (name, link) => {
            imagePreviewPopup.open(name, link);
          },
        },
        "#place-template"
      );
      const cardElement = newPlace.createCard();
      addPlaceValidation.enableValidation();
      placeCards.setItems(cardElement);
    },
  },

  placesContainer
);

placeCards.renderItems();

const userInfo = new UserInfo(profileName.textContent, profileTitle.textContent);

const profileEditor = new PopupWithForm(".popup_role_edit", ({ name, title }) => {
  userInfo.setUserInfo(name, title);
  profileEditor.close();
});

profileEditor.setEventListeners();

const imageAdderPopup = new PopupWithForm(".popup_role_add", ({ name, link }) => {
  initialCards.unshift({ name, link });
  placeCards.renderItems();
  imageAdderPopup.close();
});

imageAdderPopup.setEventListeners();

editButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  popupName.value = data.name;
  popupTitle.value = data.title;
  profileValidation.toggleButtonState();
  profileEditor.open();
});

addButton.addEventListener("click", () => {
  addPlaceValidation.enableValidation();
  imageAdderPopup.open();
});
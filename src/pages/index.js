import "../pages/index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import { settings, placesContainer, editButton, profileEditorForm, addButton, imageAdderForm, profileName, profileTitle, popupName, popupTitle, initialCards, popupProfileEditor, popupNewPlaceAdder, placeTemplate, popupImagePreview } from "../utils/constants.js";

const addPlaceValidation = new FormValidator(settings, imageAdderForm); 
const profileValidation = new FormValidator(settings, profileEditorForm); 
 
profileValidation.enableValidation(); 
addPlaceValidation.enableValidation(); 

const userInfo = new UserInfo(profileName.textContent, profileTitle.textContent); 

const placeCards = new Section( 
  { 
    items: initialCards, 
    renderer: (item) => { 
    const cardElement = createCard(item);
    placeCards.setItems(cardElement);
    }
  },
  placesContainer );

  placeCards.renderItems();

function createCard(item) {
  const newPlace = new Card({
    item,
    handleCardClick: ({ name,link })  => {
        imagePreviewPopup.open({ name,link }) ;
      }
    },
    placeTemplate);
  return newPlace.generateCard();
}
const profileEditor = new PopupWithForm(popupProfileEditor, ({name, title }) => { 
  userInfo.setUserInfo(name, title); 
  profileEditor.close(); 
}); 
   
  profileEditor.setEventListeners(); 
  editButton.addEventListener("click", () => { 
    const data = userInfo.getUserInfo(); 
    popupName.value = data.name; 
    popupTitle.value = data.title; 
    profileValidation.toggleButtonState(); 
    profileEditor.open(); 
  })
  const imagePreviewPopup = new PopupWithImage(popupImagePreview);  
  
  const imageAdderPopup = new PopupWithForm(popupNewPlaceAdder, ({ name,link })  => { 
  
    initialCards.unshift({name, link }); 
    placeCards.renderItems(); 
    imageAdderPopup.close(); 
  }); 
   
  imageAdderPopup.setEventListeners(); 
  addButton.addEventListener("click", () => { 
    addPlaceValidation.enableValidation(); 
    imageAdderPopup.open(); 
  }); 

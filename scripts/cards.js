const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


let placesList = document.querySelector('.places__list');
let popupImageAttr = document.querySelector('.popup__image');
let popupCaption = document.querySelector('.popup__caption');
let imagePopup = document.querySelector('.popup_type_image');
let closeButtonImage = imagePopup.querySelector('.popup__close');

function createCard(cardName, cardLink) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__image').src = cardLink;
  cardElement.querySelector('.card__image').alt = cardName;
  cardElement.querySelector('.card__title').textContent = cardName;
  let likedButton = cardElement.querySelector('.card__like-button');
  let deletedButton = cardElement.querySelector('.card__delete-button');

  likedButton.addEventListener("click", function() {
    likedButton.classList.toggle('card__like-button_is-active');
  });

  deletedButton.addEventListener("click", function() {
    deletedButton.closest('.places__item').remove();
  });

  cardImage.addEventListener("click", function() {
    popupImageAttr.src = cardLink;
    popupImageAttr.alt = cardName;
    popupCaption.textContent = cardName;
    openModal(imagePopup);
  });

  closeButtonImage.addEventListener('click', function () {
    closeModal(imagePopup);
  });
  return cardElement;
}

initialCards.forEach(function (item) {
  placesList.append(createCard(item.name, item.link));
});

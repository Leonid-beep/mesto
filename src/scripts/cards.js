import {openModal, closeModal} from './modal.js';

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


export let placesList = document.querySelector('.places__list');
const popupImageAttr = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup_type_image');
const closeButtonImage = imagePopup.querySelector('.popup__close');

//Функция создания карточки
export function createCard(cardName, cardLink) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__image').src = cardLink;
  cardElement.querySelector('.card__image').alt = cardName;
  cardElement.querySelector('.card__title').textContent = cardName;
  const likedButton = cardElement.querySelector('.card__like-button');
  const deletedButton = cardElement.querySelector('.card__delete-button');
  //Поставить или убрать лайк
  likedButton.addEventListener("click", function() {
    likedButton.classList.toggle('card__like-button_is-active');
  });
  //Кнопка удаления карточки
  deletedButton.addEventListener("click", function() {
    deletedButton.closest('.places__item').remove();
  });
  //Обработчик нажатия на карточку
  cardImage.addEventListener("click", function() {
    popupImageAttr.src = cardLink;
    popupImageAttr.alt = cardName;
    popupCaption.textContent = cardName;
    openModal(imagePopup);
  });
  //Обработчик нажатия на кнопку закрытия карточки
  closeButtonImage.addEventListener('click', () => closeModal(imagePopup));

  //Закрытие попапа картинки нажатием на оверлэй
  imagePopup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closeModal(imagePopup)
    }
  });
  return cardElement;
}

initialCards.forEach(function (item) {
  placesList.append(createCard(item.name, item.link));
});

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtonEdit = profilePopup.querySelector('.popup__close');
const closeButtonCard = cardPopup.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

let popup = document.querySelectorAll('.popup');
//Добавление анимации каждой карточке
popup.forEach((item) => {
  item.classList.add('popup_is-animated');
})
//Функция открытия модального окна
function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc); // Add event listener here
}
//Функция закрытия модального окна
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc); // Remove event listener here
}
//Функция закрытия окна нажатием на Escape
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) { // Check if a popup is open
      closeModal(openedPopup);
    }
  }
}

// Обработчик нажатия на кнопку редактирования профиля
editButton.addEventListener('click', function() {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openModal(profilePopup);
});
// Обработчик нажатия на кнопку закрытия редактирования профиля
closeButtonEdit.addEventListener('click', function () {
  closeModal(profilePopup);
});

// Закрытие попапа редактирования нажатием на оверлей
profilePopup.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closeModal(profilePopup)
  }
});

const profileFormElement = profilePopup.querySelector('.popup__form');
// Сохранение данных, введенных в окно редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
// Обработчик нажатия на кнопку добавления новой карточки
addButton.addEventListener('click', function() {
  let cardName = document.querySelector('.popup__input_type_card-name');
  let cardURL = document.querySelector('.popup__input_type_url');
  cardName.value = '';
  cardURL.value = '';
  const inputList = Array.from(cardPopup.querySelectorAll('.popup__input'));
  const submitButton = cardPopup.querySelector('.popup__button');
  toggleButtonState(inputList, submitButton);
  openModal(cardPopup);
});
// Обработчик нажатия на кнопку закрытия добавления новой карточки
closeButtonCard.addEventListener('click', function () {
  closeModal(cardPopup);
});

// Закрытие попапа добавления карточки нажатием на оверлей
cardPopup.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closeModal(cardPopup)
  }
});

const cardFormElement = cardPopup.querySelector('.popup__form');
// Добавление новой карточки
function handlecardFormSubmit(evt) {
    evt.preventDefault();
    let cardName = document.querySelector('.popup__input_type_card-name');
    let cardURL = document.querySelector('.popup__input_type_url');
    placesList.prepend(createCard(cardName.value, cardURL.value));
    closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handlecardFormSubmit);

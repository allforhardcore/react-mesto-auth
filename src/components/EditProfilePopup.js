import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  //Подписываемся на контекст
  const currentUser = useContext(CurrentUserContext);

  //Cтейты имени и описания профиля
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  //После загрузки данных пользователя из API, эти данные будут использоваться в управляемых компонентах
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  //Функция для управления именем через поле ввода
  function handleUserName(e) {
    setName(e.target.value)
  }

  //Функция для управления описанием профиля через поле ввода
  function handleUserDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={'Редактировать профиль'}
      name={'profile'}
      buttonName={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          className="popup__input-item"
          type="text"
          placeholder="Имя"
          name="popupInputProfileName"
          required
          minLength="2"
          maxLength="40"
          onChange={handleUserName}
          value={name ? name : ''}
        />
        <span className="popup__input-error" id="popupInputProfileName-error"></span>
        <input
          className="popup__input-item"
          type="text"
          placeholder="О себе"
          name="popupInputProfileAbout"
          required
          minLength="2"
          maxLength="200"
          onChange={handleUserDescription}
          value={description ? description : ''}
        />
        <span className="popup__input-error" id="popupInputProfileAbout-error"></span>
      </div>

    </PopupWithForm>
  );
}

export default EditProfilePopup;
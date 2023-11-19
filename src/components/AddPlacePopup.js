import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  //Стейты для имени и ссылки на картинку
  const [cardTitle, setCardTitle] = useState('');
  const [cardLink, setCardLink] = useState('');

  //Обработчик установки названия места
  function handleCardTitle(event) {
    setCardTitle(event.target.value)
  }

  //Обработчик установки картинки (ссылки на картинку)
  function handleCardLink(event) {
    setCardLink(event.target.value)
  }

  //Обработчик сабмита формы поп-апа добавления карточки
  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: cardTitle,
      link: cardLink
    })
  }

  useEffect(() => {
    setCardLink('')
    setCardTitle('')
  }, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={'Новое место'}
      name={'place'}
      buttonName={'Сохранить'}
    >

      <div className="popup__input-container">
        <input
          className="popup__input-item"
          type="text"
          placeholder="Название"
          name="popupInputPlaceName"
          required
          minLength="2"
          maxLength="30"
          onChange={handleCardTitle}
          value={cardTitle ? cardTitle : ''}
        />

        <span className="popup__input-error" id="popupInputPlaceName-error"></span>

        <input
          className="popup__input-item"
          type="url"
          placeholder="Ссылка на картинку"
          name="popupInputImageLink"
          required
          onChange={handleCardLink}
          value={cardLink ? cardLink : ''}
        />

        <span className="popup__input-error" id="popupInputImageLink-error"></span>

      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
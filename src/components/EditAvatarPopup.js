import React, { useRef, useEffect } from 'react'
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  //Реф аватара
  const avatarRef = useRef('');

  //Очистка поля ввода ссылки после закрытия
  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  //Обновление аватара
  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (

    < PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={'Обновить аватар'}
      name={'avatar'}
      buttonName={'Сохранить'}

    >
      <div className='popup__input-container'>
        <input
          className='popup__input-item'
          type='url'
          name='popupInputAvatarLink'
          required
          placeholder='Ссылка на фото'
          ref={avatarRef}
        />
        <span
          id='popupInputAvatarLink-error'
          className='popup__input-error'
        >
        </span>
      </div>
    </PopupWithForm>

  );
}

export default EditAvatarPopup
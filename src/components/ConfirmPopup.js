import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onSubmit }) {
  

  return (
    <PopupWithForm
      name="confirmation"
      title={'Вы уверены?'}
      buttonName={'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
    </PopupWithForm>
  );
}

export default ConfirmPopup;
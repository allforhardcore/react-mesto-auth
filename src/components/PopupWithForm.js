import React from 'react';

function PopupWithForm({ name, title, buttonName, isOpen, onClose, onSubmit, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_state_show"}`}>
      <div className="popup__container popup__container_type_form">
        <button type="button" className="popup__close-button" onClick={onClose}/>
        <h2 className="popup__heading">{title}</h2>
        <form name={name} className="popup__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit-button">{buttonName}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
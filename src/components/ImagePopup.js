import React from 'react';

function ImagePopup({ card, onClose }) {

  return (
    <div className={`popup popup_type_image ${card ? 'popup_state_show' : ''}`}>
      <div className="popup__container  popup__container_type_image">
        <img src={card ? card.link : ""} className="popup__image" alt={card ? card.name : ""} />
        <p className="popup__caption">{card ? card.name : ""}</p>
        <button className="popup__close-button" type="button" aria-label="кнопка закрыть" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;



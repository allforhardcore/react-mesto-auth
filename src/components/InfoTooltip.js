import React from "react";

function InfoTooltip({ name, isOpen, onClose, isSuccess }) {

  return (
    <div className={`popup popup_type_registration ${isOpen && "popup_state_show"}`}>
      <div className="popup__container popup__container_type_form">
        <button type="button" className="popup__close-button" onClick={onClose} />
        <div className={`popup__status ${isSuccess ? 'popup_status_registration-success' : 'popup_status_registration-fail'}`}></div>
        <h2 className="popup__heading popup__heading_position-bottom">
          {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
        </h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
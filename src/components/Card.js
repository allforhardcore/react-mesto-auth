import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDeleteRequest }) {

  //Подписка на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  //Определяем, являемся ли мы владельцем карточки
  const isOwn = card.owner._id === currentUser._id;

  //Определяем, есть ли у карточки поставленный нами лайк
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  //Переменная для класса кнопки лайка (закрашивание, если карточка лайкнута нами)
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? 'element__like-button_state_activated' : ''}`
  );

  //Обработчик клика по карточке
  function handleCardClick() {
    onCardClick(card);
  }

  //Обработчик клика по лайку
  function handleCardLike() {
    onCardLike(card)
  }

  function handleDeleteRequest() {
    onCardDeleteRequest(card);
  }

  return (
    <div className="element">
      <img className="element__picture" src={card.link} alt={card.name} onClick={handleCardClick} />
      {isOwn && <button type="button" className='element__delete-button' onClick={() => handleDeleteRequest()} aria-label="Удалить" />}
      <div className="element__content-wrapper">
        <h2 className="element__heading">{card.name}</h2>
        <div className="element__like-wrapper">
          <button className={cardLikeButtonClassName} type="button" aria-label="лайк" onClick={handleCardLike}></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )

}

export default Card;
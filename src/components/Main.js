import React, { useContext } from 'react';
import editAvatarButton from '../images/avatar-edit-icon.svg';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  onCardDeleteRequest,
  cards
}) {

  //Подписка на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <button className="profile__picture-edit-button" type="button" aria-label="редактировать" onClick={onEditAvatar}>
            <img src={editAvatarButton} alt="редактировать" />
          </button>
          <img className="profile__picture" src={`${currentUser.avatar}`} alt="аватар" />
        </div>

        <div className="profile__info">
          <h1 className="profile__heading">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="кнопка редактировать" onClick={onEditProfile}></button>
          <p className="profile__caption">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="кнопка добавить" onClick={onAddPlace} ></button>
      </section>

      <section className="elements">
        {cards && Array.isArray(cards) && cards.length > 0 ? (
          cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onCardDeleteRequest={onCardDeleteRequest}
            />
          ))
        ) : (
          <p>Нет карточек для отображения</p>
        )}
      </section>


    </main>
  );
}

export default Main;
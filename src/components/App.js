import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {

  const [currentUser, setCurrentUser] = useState({});

  // Стейты попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsEditPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [userName, setUserName] = useState(''); // стейт для userName
  const [userDescription, setUserDescription] = useState(''); // стейт для userDescription
  const [userAvatar, setUserAvatar] = useState(''); // стейт для userAvatar
  const [cards, setCards] = useState([]);
  const [cardToRemove, setСardToRemove] = useState({})

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmPopupOpen || selectedCard

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, cardsData] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards()
        ]);

        setCurrentUser(userData);
        setCards(cardsData);
      } catch (error) {
        console.error('Произошла ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);


  function handleCardClick(props) {
    setSelectedCard(props);
  }

  // Обработчик открытия попапа аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  // Обработчик открытия попапа профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  // Обработчик открытия попапа добавления карточки
  function handleAddPlaceClick() {
    setIsEditPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем статус лайка на карточке
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
    })
      .catch(console.error);
  }

  // Функция удаления карточки
  function handleCardDelete(evt) {
    evt.preventDefault();
    api.removeCard(cardToRemove._id)
      .then(
        () => {
          const newCards = cards.filter((elem) => elem !== cardToRemove);
          setCards(newCards);
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
  }

  function handleCardDeleteRequest(card) {
    setСardToRemove(card);
    setIsConfirmPopupOpen(true);
  }

  function handleUpdateUser(user) {
    const userData = {
      name: user.name,
      about: user.about
    };

    api.editUserInfo(userData)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(user) {
    api.setAvatar({ avatar: user.avatar })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
  }

  function handleAddPlaceSubmit(card) {
    const cardData = {
      name: card.name,
      link: card.link,
      owner: currentUser._id
    };

    api.addCard(cardData)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">

        <PopupWithForm />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          cardToRemove={cardToRemove}
        />
          
        <Header />
        <Main
          userAvatar={userAvatar}
          userName={userName}
          userDescription={userDescription}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onSubmit={handleCardDelete}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDeleteRequest={handleCardDeleteRequest}
          onCardDelete={handleCardDelete}
        />
        <Footer />

      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;



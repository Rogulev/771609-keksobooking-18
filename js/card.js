'use strict';
(function () {

  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  // Рендер списка доп.услуг для карточки
  var renderFeatures = function (featuresBlock, templateFeature, countFeatures) {
    for (var i = 0; i < countFeatures.length; i++) {
      var feature = templateFeature.cloneNode();
      feature.className = 'popup__feature popup__feature--' + countFeatures[i];
      featuresBlock.appendChild(feature);
    }
  };
  // Рендер фоток для карточек
  var renderPhotos = function (photosBlock, templatePhoto, countPhotos) {
    for (var k = 0; k < countPhotos.length; k++) {
      var photo = templatePhoto.cloneNode();
      photo.setAttribute('src', countPhotos[k]);
      photosBlock.appendChild(photo);
      templatePhoto.remove();
    }
  };

  // Рендерим карточку
  var renderCard = function (elem) {
    var fragment = document.createDocumentFragment();
    var element = templateCard.cloneNode(true);
    element.querySelector('.popup__title').textContent = elem.offer.title;
    element.querySelector('.popup__text--address').textContent = elem.offer.address;
    element.querySelector('.popup__text--price').textContent = elem.offer.price + '₽/ночь';
    element.querySelector('.popup__type').textContent = window.data.translateType(elem.offer.type);
    element.querySelector('.popup__text--capacity').textContent = elem.offer.rooms + ' комнаты для ' + elem.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + elem.offer.checkin + ', выезд до ' + elem.offer.checkout;
    // Заполняем "особенности"
    var featuresBlock = element.querySelector('.popup__features');
    var templateFeature = featuresBlock.querySelector('.popup__feature');
    var countFeatures = elem.offer.features;
    featuresBlock.innerHTML = '';
    renderFeatures(featuresBlock, templateFeature, countFeatures);
    // Заполнение Фото
    element.querySelector('.popup__description').textContent = elem.offer.description;
    var photosBlock = element.querySelector('.popup__photos');
    var templatePhoto = photosBlock.querySelector('.popup__photo');
    var countPhotos = elem.offer.photos;
    photosBlock.innerHTML = '';
    renderPhotos(photosBlock, templatePhoto, countPhotos);
    element.querySelector('.popup__avatar').src = elem.author.avatar;

    fragment.appendChild(element);
    window.data.mapPins.appendChild(fragment);
  };

  // закрытие карточки
  var closePopup = function () {
    var cardPopup = document.querySelector('.map__card.popup');
    if (cardPopup) {
      cardPopup.remove();
    }
  };

  // События закрытия карточки
  var setEventCardClose = function () {
    var popupClose = document.querySelector('.popup__close');

    popupClose.addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        closePopup();
      }
    });
  };

  var onPinClick = function (pin, elem) {
    var pinCallback = function () {
      closePopup();
      renderCard(elem);
      setEventCardClose();
    };
    window.events.addEvents(pin, ['mousedown', 'keydown'], pinCallback);
  };

  var setEventPin = function (arr) {
    var pins = document.querySelectorAll('.map__pin--rendered');

    for (var i = 0; i < pins.length; i++) {
      onPinClick(pins[i], arr[i]);
    }
  };
  window.card = {
    'closePopup': closePopup,
    'setEventPin': setEventPin
  };
})();

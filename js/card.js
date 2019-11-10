'use strict';

(function () {

  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var fragment = document.createDocumentFragment;
  var element = templateCard.cloneNode(true);
  var renderFeatures = function (featuresBlock, templateFeature, countFeatures) {
    for (var i = 0; i < countFeatures.length; i++) {
      var feature = templateFeature.cloneNode();
      feature.className = 'popup__feature popup__feature--' + countFeatures[i];
      featuresBlock.appendChild(feature);
    }
  };
  var renderPhotos = function (photosBlock, templatePhoto, countPhotos) {
    for (var k = 0; k < countPhotos.length; k++) {
      var photo = templatePhoto.cloneNode();
      photo.setAttribute('src', countPhotos[k]);
      photosBlock.appendChild(photo);
      templatePhoto.remove();
    }
  };

  // Рендерим карточку
  window.renderCard = function (dataElem) {
    element.querySelector('.popup__title').textContent = dataElem.offer.title;
    element.querySelector('.popup__text--address').textContent = dataElem.offer.address;
    element.querySelector('.popup__text--price').textContent = dataElem.offer.price + '₽/ночь';
    element.querySelector('.popup__type').textContent = window.data.translateType(dataElem.offer.type);
    element.querySelector('.popup__text--capacity').textContent = dataElem.offer.rooms + ' комнаты для ' + dataElem.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataElem.offer.checkin + ', выезд до ' + dataElem.offer.checkout;
    // Заполняем "особенности"
    var featuresBlock = element.querySelector('.popup__features');
    var templateFeature = featuresBlock.querySelector('.popup__feature');
    var countFeatures = dataElem.offer.features;
    featuresBlock.innerHTML = '';
    renderFeatures(featuresBlock, templateFeature, countFeatures);
    // Заполнение Фото
    element.querySelector('.popup__description').textContent = dataElem.offer.description;
    var photosBlock = element.querySelector('.popup__photos');
    var templatePhoto = photosBlock.querySelector('.popup__photo');
    var countPhotos = dataElem.offer.photos;
    photosBlock.innerHTML = '';
    renderPhotos(photosBlock, templatePhoto, countPhotos);
    element.querySelector('.popup__avatar').src = dataElem.author.avatar;

    fragment.appendChild(element);
    window.data.mapPins.appendChild(fragment);
  };
})();

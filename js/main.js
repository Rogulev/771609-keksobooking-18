'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var OFFERS_AMMOUNT = 8;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var mapPins = document.querySelector('.map__pins');
var TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getFeatures = function () {
  var newFeatures = [];
  var count = getRandomInt(0, features.length - 1);
  for (var i = 0; i < count; i++) {
    newFeatures[i] = features[i];
  }
  return newFeatures;
};

var getPhotos = function(min, max) {
  var photos = [];
  var count = getRandomInt(min, max);
  for (var i = 0; i < count; i++) {
    photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg'
  }
  return photos;
};

var bookingInfo = [];

var createArrayInfo = function () {
  for (var i = 0; i <= OFFERS_AMMOUNT; i++) {
    bookingInfo[i] = {
      autor: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: 'Заголовок Предложения',
        address: '600, 350',
        price: 1000,
        type: TYPE_HOUSING[getRandomInt(0, TYPE_HOUSING.length - 1)],
        rooms: getRandomInt(1, 3),
        guests: getRandomInt(1, 3),
        checkin: times[getRandomInt(0, 3)],
        checkout: times[getRandomInt(0, 3)],
        features: getFeatures(),
        description: 'Тут будет описание',
        photos: getPhotos(1,3)
      },

      location:{
        x: getRandomInt(MIN_X, MAX_X),
        y: getRandomInt(MIN_Y, MAX_Y)
      }
    };
    }
};
createArrayInfo();

var renderPins = function (info) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < bookingInfo.length; i++) {
    var element = template.cloneNode(true);
    var img = element.querySelector('img');
    element.style.left = info[i].location.x + 'px';
    element.style.top = info[i].location.y + 'px';
    img.src = info[i].autor.avatar;
    img.alt = info[i].offer.type;
    fragment.appendChild(element);
  }
  mapPins.appendChild(fragment);
};
renderPins(bookingInfo);

'use strict';

var ENTER_KEYCODE = 13;
var OFFERS_AMMOUNT = 8;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var mapPins = document.querySelector('.map__pins');
var mainMapPin = document.querySelector('.map__pin--main');
var TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var inputAddress = document.getElementById('address');
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');

// Функция получения рандомного числа
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Функция генерации доп.фцнкций жилья
var getFeatures = function () {
  var newFeatures = [];
  var count = getRandomInt(0, features.length - 1);
  for (var i = 0; i < count; i++) {
    newFeatures[i] = features[i];
  }
  return newFeatures;
};

// Генерация получения массива ФОТО
var getPhotos = function (min, max) {
  var photos = [];
  var count = getRandomInt(min, max);
  for (var i = 0; i < count; i++) {
    photos[i] =
      'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
  }
  return photos;
};

// Наполнение массива букинг объектами
var bookingInfo = [];

var createArrayInfo = function () {
  for (var i = 0; i < OFFERS_AMMOUNT; i++) {
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
        photos: getPhotos(1, 3)
      },

      location: {
        x: getRandomInt(MIN_X, MAX_X),
        y: getRandomInt(MIN_Y, MAX_Y)
      }
    };
  }
};
createArrayInfo();

// Отрисовка pin на карте
var renderPins = function (info) {
  var template = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');
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

// Вычисление координат стартовой метки
var coordinatePinStart = {
  x: Math.round(mapPins.offsetWidth / 2 + mainMapPin.offsetWidth / 2),
  y: Math.round(mapPins.offsetHeight / 2 + mainMapPin.offsetHeight / 2)
};

// Заполнение поля адреса
inputAddress.value = coordinatePinStart.x + ',' + coordinatePinStart.y;

// Добавление disabled на Формы
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');

var formDisabled = function () {
  for (var i = 0; i < adForm.children.length; i++) {
    adForm.children[i].setAttribute('disabled', true);
  }
  for (var i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].setAttribute('disabled', true);
  }
};
formDisabled();

// Добавление активации страницы по клику
var mainUnblocking = function () {
  formUnblocking (), renderPins (bookingInfo);
};

var onPinEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    mainUnblocking();
  }
};

var formUnblocking = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  for (var i = 0; i < adForm.children.length; i++) {
    adForm.children[i].removeAttribute('disabled', true);
  }
  for (var i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].removeAttribute('disabled', true);
  }
  mainPin.removeEventListener('mousedown', mainUnblocking);

  mainPin.removeEventListener('keydown', onPinEnterPress);
};

mainPin.addEventListener('mousedown', mainUnblocking);

mainPin.addEventListener('keydown', onPinEnterPress);

// Сценарий сопоставления гостей и кол-во комнат  в форме

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var options = capacity.querySelectorAll('option');

var disabledOptions = function (opt) {
  for (var i = 0; i < options.length - 1; i++) {
    options[i].removeAttribute('disabled', 'disabled');
  }

  if (opt >= 0 && opt <= 2) {
    options[options.length - 1].setAttribute('disabled', 'disabled');

    for (var i = 0; i < opt; i++) {
      options[i].setAttribute('disabled', 'disabled');
    }
  } else {
    for (var i = 0; i < options.length - 1; i++) {
      options[i].setAttribute('disabled', 'disabled');
    }
    options[options.length - 1].removeAttribute('disabled');
  }
};

roomNumber.addEventListener('change', function () {
  switch (roomNumber.value) {
    case '1':
      disabledOptions(2);
      // capacity.setCustomValidity('Количество гостей не более 1');
      break;
    case '2':
      disabledOptions(1);
      // capacity.setCustomValidity('Количество гостей не более 2');
      break;
    case '3':
      disabledOptions(0);
      // capacity.setCustomValidity('Количество гостей не более 3');
      break;
    case '100':
      disabledOptions(3);
      // capacity.setCustomValidity('Не для гостей');
      break;
  }
});

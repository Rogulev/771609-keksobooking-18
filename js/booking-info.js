"use strict";
(function () {
  // Функция получения рандомного числа
  var getRandomInt = function (min, max) {
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
        "http://o0.github.io/assets/images/tokyo/hotel" + (i + 1) + ".jpg";
    }
    return photos;
  };

  // Наполнение массива букинг объектами
  var bookingInfo = [];
  var createArrayInfo = function () {
    for (var i = 0; i < OFFERS_AMMOUNT; i++) {
      bookingInfo[i] = {
        autor: {
          avatar: "img/avatars/user0" + (i + 1) + ".png"
        },

        offer: {
          title: "Заголовок Предложения",
          address: "600, 350",
          price: 1000,
          type: window.data.TYPE_HOUSING[getRandomInt(0, window.data.TYPE_HOUSING.length - 1)],
          rooms: getRandomInt(1, 3),
          guests: getRandomInt(1, 3),
          checkin: times[getRandomInt(0, 3)],
          checkout: times[getRandomInt(0, 3)],
          features: getFeatures(),
          description: "Тут будет описание",
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

})();
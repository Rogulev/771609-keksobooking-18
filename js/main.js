var OFFERS_AMMOUNT = 8;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var bookingInfo = [];
for (var i = 0; i <= OFFERS_AMMOUNT; i++) {
  bookingInfo.push({

  author: {
    avatar: 'img/avatars/user0' + i + '.png'
  },

  offer: {
    title: 'Заголовок Предложения',
    address: '600, 350',
    price: 1000,
    type: TYPE_HOUSING[getRandomInt(0, TYPE_HOUSING.length)],
    rooms: getRandomInt(1, 3),
    guests: getRandomInt(1, 3),
    checkin: times[Math.floor(Math.random() * times.length)],
    checkout: times[Math.floor(Math.random() * times.length)],
    features: ,
    description: 'Тут будет описание',
    photos: ,
  },

  location: {
    locationX: getRandomInt(MIN_X, MAX_Y),
    locationY: getRandomInt(MIN_Y, MAX_Y)
  }
  })
};

'use strict';

(function () {
  var inputAddress = document.querySelector('#address');
  var PIN_WIDTH = window.data.mainPin.offsetWidth / 2;
  var PIN_HEIGHT = window.data.mainPin.offsetHeight;
  var PIN_ARROW = 22;

  // Рендер событий на keydown и click
  var addEvents = function (node, events, callback) {
    events.forEach(function (event) {
      if (event === 'keydown') {
        node.addEventListener(event, function (evt) {
          if (evt.keyCode === window.data.ENTER_KEYCODE) {
            evt.preventDefault();
            callback();
          } else if (evt.keyCode === window.data.ESC_KEYCODE) {
            evt.preventDefault();
            callback();
          }
        });
      } else {
        node.addEventListener(event, callback);
      }
    });
  };

  // Вычисление координат стартовой метки
  var getCoordinatePinStart = {
    x: Math.round(window.data.mapPins.offsetWidth / 2),
    y: Math.round(window.data.mapPins.offsetHeight / 2)
  };

  // Стартовая позиция пина(заполнение)
  var coordinatePinInput = function (x, y) {
    inputAddress.value = x + ', ' + y;
  };
  coordinatePinInput(getCoordinatePinStart.x, getCoordinatePinStart.y);

  // НОВАЯ ВСТАВКА КООРДИНАТ
  var setCoord = function () {
    var x = window.data.mainPin.offsetLeft;
    var y = window.data.mainPin.offsetTop;
    inputAddress.value = Math.round(x + PIN_WIDTH) + ' ' + (y + PIN_HEIGHT + PIN_ARROW);
  };

  var onMainPin = function () {
    if (!window.isActive) {
      window.render.formUnblocking();
      window.isActive = true;
      setCoord();
    }
  };

  // Событие Перетаскивания
  var onMainPinMove = function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      // dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var coordX = window.data.mainPin.offsetLeft - shift.x;
      var coordY = window.data.mainPin.offsetTop - shift.y;
      var mapWidth = document.querySelector('.map').offsetWidth;
      var minMapHeigth = 130;
      var maxMapHeigth = 630;

      if (coordX >= (0 - PIN_WIDTH) && coordX <= (mapWidth - PIN_WIDTH) && coordY >= minMapHeigth && coordY <= maxMapHeigth) {

        window.data.mainPin.style.top = coordY + 'px';
        window.data.mainPin.style.left = coordX + 'px';

        setCoord();
      }

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setCoord();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  window.data.mainMapPin.addEventListener('mousedown', onMainPinMove);
  addEvents(window.data.mainPin, ['mousedown', 'keydown'], onMainPin);


  window.events = {
    'addEvents': addEvents,
    'onMainPinMove': onMainPinMove,
    'coordinatePinInput': coordinatePinInput,
    'getCoordinatePinStart': getCoordinatePinStart,
    'onMainPin': onMainPin
  };
})();

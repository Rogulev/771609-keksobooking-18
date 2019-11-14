'use strict';

(function () {
  var inputAddress = document.querySelector('#address');
  var PIN_WIDTH = window.data.mainPin.offsetWidth / 2;
  var PIN_HEIGHT = window.data.mainPin.offsetHeight;
  var PIN_ARROW = 22;

  // Вычисление координат стартовой метки
  var getCoordinatePinStart = {
    x: Math.round(window.data.mapPins.offsetWidth / 2 + PIN_WIDTH),
    y: Math.round(window.data.mapPins.offsetHeight / 2 + PIN_HEIGHT)
  };

  // Стартовая позиция пина(заполнение)
  var  coordinatePinInput = function (x, y) {
    inputAddress.value = x + ', ' + y
  };
  coordinatePinInput(getCoordinatePinStart.x, getCoordinatePinStart.y);


  // Событие Перетаскивания
  window.data.mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: window.data.mainMapPin.x,
      y: window.data.mainMapPin.y
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.data.mainPin.style.left = getCoordinatePinStart.offsetLeft - shift.x;
      window.data.mainPin.style.top = getCoordinatePinStart.offsetTop - shift.y;

      var checkLimitPin = function (element) {
        var elementCoordinate = {
          x: element.offsetLeft - shift.x,
          y: element.offsetTop - shift.y
        };

        if (element.offsetTop - shift.y <= window.data.MIN_Y) {
          elementCoordinate.y = window.data.MIN_Y;
        } else if (element.offsetTop - shift.y >= window.data.MAX_Y) {
          elementCoordinate.y = window.data.MAX_Y;
        }
        if (element.offsetLeft - shift.x <= window.data.MIN_X) {
          elementCoordinate.x = window.data.MIN_X;
        } else if (element.offsetLeft - shift.x >= window.data.MAX_X) {
          elementCoordinate.x = window.data.MAX_X;
        }
        return elementCoordinate;
      };

      var moveElement = function () {
        var newCoordinate = checkLimitPin(window.data.mainPin);
        window.data.mainPin.style.left = newCoordinate.x + 'px';
        window.data.mainPin.style.top = newCoordinate.y + 'px';
      };
      coordinatePinInput(window.data.mainPin.style.left, window.data.mainPin.style.top);
      moveElement();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Рендер событий на keydown и click
  window.addEvents = function (node, events, callback) {
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
})();

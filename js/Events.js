'use strict';

(function () {

  // Вычисление координат стартовой метки
  var getCoordinatePinStart = {
    x: Math.round(window.data.mapPins.offsetWidth / 2 + window.data.mainMapPin.offsetWidth / 2),
    y: Math.round(window.data.mapPins.offsetHeight / 2 + window.data.mainMapPin.offsetHeight / 2)
  };

  // Заполнение поля адреса
  window.data.inputAddress.value = getCoordinatePinStart.x + ',' + getCoordinatePinStart.y;

  // Событие Перетаскивания
  window.data.mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: getCoordinatePinStart.x,
      y: getCoordinatePinStart.y
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

      window.data.mainMapPin.style.left = (getCoordinatePinStart.offsetLeft - shift.x) + 'px';
      window.data.mainMapPin.style.top = (getCoordinatePinStart.offsetTop - shift.y) + 'px';

      var checkLimitPin = function (element) {
        var elementCoordinate = {
          x: element.offsetLeft - shift.x,
          y: element.offsetTop - shift.y
        };

        if (element.offsetTop - shift.y < window.data.MIN_Y) {
          elementCoordinate.y = window.data.MIN_Y;
        } else if (element.offsetTop - shift.y > window.data.MAX_Y) {
          elementCoordinate.y = window.data.MAX_Y;
        }
        if (element.offsetLeft - shift.x < window.data.MIN_X) {
          elementCoordinate.x = window.data.MIN_X;
        } else if (element.offsetLeft - shift.x > window.data.MAX_X) {
          elementCoordinate.x = window.data.MAX_X;
        }
        return elementCoordinate;
      };

      var moveElement = function () {
        var newCoordinate = checkLimitPin(window.data.mainMapPin);
        window.data.mainMapPin.style.left = newCoordinate.x + 'px';
        window.data.mainMapPin.style.top = newCoordinate.y + 'px';
      };
      window.data.inputAddress.value = window.data.mainMapPin.style.left + ',' + window.data.mainMapPin.style.top;
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
  window.isActive = false;

  window.addEvents = function (node, events, callback) {
    events.forEach(function (event) {
      if (event === 'keydown') {
        node.addEventListener(event, function (evt) {
          if (evt.keyCode === 13) {
            evt.preventDefault();
            callback();
          } else if (evt.keyCode === 27) {
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

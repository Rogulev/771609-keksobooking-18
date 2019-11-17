'use strict';

(function () {
  var Code = {
    OK: 200,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    SERVER_ON_REBUILD:503
  };

  window.backend = {
    load: function (onLoad, onError) {
      var url = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case Code.OK:
            onLoad(xhr.response);
            break;
          case CODE.NOT_FOUND:
            onError('Статус ответа: ' + xhr.status + ' Ошибка, страницы не существует');
            break;
          case CODE.INTERNAL_SERVER:
            onError('Статус ответа: ' + xhr.status + ' Ошибка на сервере');
            break;
          case CODE.SERVER_ON_REBUILD:
            onError('Статус ответа: ' + xhr.status + ' Производятся работы на сервере');
            break;
          default:
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.open('GET', url);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var url = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;

          default:
            onError();
        }
      });

      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();

'use strict';

module.exports = function (ngApp) {

  ngApp.factory('UserEntity', function ($resource) {
    return $resource('http://hra-backend.entrydns.org/users/:userId', {
      userId: '@id'
    });
  });

};

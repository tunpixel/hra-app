'use strict';

var hraApp = require('./../../common/app');

require('./../../common/paginateTo-filter')(hraApp);


hraApp.controller('MainController', MainController);

function MainController() {

  this.users = data;

  this.user = null;

}

MainController.prototype.select = function (user) {
  this.user = user;
};

'use strict';

var hraApp = require('./../../common/app');

require('./../../users/scripts/users')(hraApp);

hraApp.controller('MainController', MainController);

function MainController() {


}

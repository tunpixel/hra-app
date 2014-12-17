'use strict';

require('angular');
// require('angular-i18n/angular-locale_fr');
require('angular-sanitize');
// require('angular-cookies');
require('angular-resource');
require('angular-animate');
require('angular-touch');
require('angular-aria');
require('angular-loading-bar');
require('ng-table');

var hraApp = angular.module('hraApp', [
  // 'ngSanitize',
  'ngResource',
  'ngAnimate',
  'ngTouch',
  'ngAria',
  'angular-loading-bar',
  'ngTable'
]);

module.exports = hraApp;

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function (ngApp) {


  ngApp.controller('UsersController', UsersController);

  function UsersController($http) {

    this.userView = 'modules/users/views/user-view.html';

    // list of users
    this.users = null;

    // selected user
    this.user = null;

    // server-side page size
    this.pageSize = 100;

    // loading indicator
    this.loading = false;

    var that = this;

    this.load = function () {
      if (!that.loading) {
        that.loading = true;

        if (!that.users) {
          that.page = 0;
        }

        var params = {
          page: that.page,
          count: that.pageSize
        };

        $http.get('/api/data.json', {
          params: params
        }).success(function (data) {

          if (!that.users) {
            that.users = [];
          }

          if (data.users && data.users.length) {
            Array.prototype.push.apply(that.users, data.users);
            that.page++;
          }

          if (data.users.length < that.pageSize) {
            that.completed = true;
          }

        }).error(function (err) {
          console.error(err);
        }).finally(function () {
          // $timeout(function () {
          that.loading = false;
          // }, 500);
        });

      }
    };

    this.load();

  }

  UsersController.prototype.reset = function () {
    this.users.length = 0;
    this.user = null;
    this.page = 0;
    this.loading = false;
    this.completed = false;
  };

  UsersController.prototype.select = function (user) {
    this.user = user;
  };


  UsersController.prototype.goAdd = function () {
    this.user = this.tempAddUser = {};
    this.userView = 'modules/users/views/user-add.html';
  };

  UsersController.prototype.saveAdd = function () {
    this.tempAddUser.id = Date.now() + '.' + Math.random();
    // this.user = angular.copy(this.tempAddUser);
    this.user = this.tempAddUser;
    this.users.push(this.user);
    this.userView = 'modules/users/views/user-view.html';
  };


  UsersController.prototype.goEdit = function (user) {
    this.editUser = user;
    this.tempEditUser = angular.copy(user);
    this.userView = 'modules/users/views/user-edit.html';
  };

  UsersController.prototype.saveEdit = function () {
    delete this.tempEditUser.id;
    angular.extend(this.editUser, this.tempEditUser);
    this.user = this.editUser;
    this.userView = 'modules/users/views/user-view.html';
  };

  UsersController.prototype.cancelEdit = function () {
    this.user = this.editUser;
    this.userView = 'modules/users/views/user-view.html';
  };

};

},{}]},{},[1])



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvbW9kdWxlcy91c2Vycy9zY3JpcHRzL3VzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InVzZXJzLmJ1bmRsZS5hbGwuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdBcHApIHtcblxuXG4gIG5nQXBwLmNvbnRyb2xsZXIoJ1VzZXJzQ29udHJvbGxlcicsIFVzZXJzQ29udHJvbGxlcik7XG5cbiAgZnVuY3Rpb24gVXNlcnNDb250cm9sbGVyKCRodHRwKSB7XG5cbiAgICB0aGlzLnVzZXJWaWV3ID0gJ21vZHVsZXMvdXNlcnMvdmlld3MvdXNlci12aWV3Lmh0bWwnO1xuXG4gICAgLy8gbGlzdCBvZiB1c2Vyc1xuICAgIHRoaXMudXNlcnMgPSBudWxsO1xuXG4gICAgLy8gc2VsZWN0ZWQgdXNlclxuICAgIHRoaXMudXNlciA9IG51bGw7XG5cbiAgICAvLyBzZXJ2ZXItc2lkZSBwYWdlIHNpemVcbiAgICB0aGlzLnBhZ2VTaXplID0gMTAwO1xuXG4gICAgLy8gbG9hZGluZyBpbmRpY2F0b3JcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgIHRoaXMubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghdGhhdC5sb2FkaW5nKSB7XG4gICAgICAgIHRoYXQubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgaWYgKCF0aGF0LnVzZXJzKSB7XG4gICAgICAgICAgdGhhdC5wYWdlID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgcGFnZTogdGhhdC5wYWdlLFxuICAgICAgICAgIGNvdW50OiB0aGF0LnBhZ2VTaXplXG4gICAgICAgIH07XG5cbiAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2RhdGEuanNvbicsIHtcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtc1xuICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICBpZiAoIXRoYXQudXNlcnMpIHtcbiAgICAgICAgICAgIHRoYXQudXNlcnMgPSBbXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZGF0YS51c2VycyAmJiBkYXRhLnVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhhdC51c2VycywgZGF0YS51c2Vycyk7XG4gICAgICAgICAgICB0aGF0LnBhZ2UrKztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZGF0YS51c2Vycy5sZW5ndGggPCB0aGF0LnBhZ2VTaXplKSB7XG4gICAgICAgICAgICB0aGF0LmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pLmVycm9yKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGF0LmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAvLyB9LCA1MDApO1xuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmxvYWQoKTtcblxuICB9XG5cbiAgVXNlcnNDb250cm9sbGVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnVzZXJzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy51c2VyID0gbnVsbDtcbiAgICB0aGlzLnBhZ2UgPSAwO1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gIH07XG5cbiAgVXNlcnNDb250cm9sbGVyLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbiAodXNlcikge1xuICAgIHRoaXMudXNlciA9IHVzZXI7XG4gIH07XG5cblxuICBVc2Vyc0NvbnRyb2xsZXIucHJvdG90eXBlLmdvQWRkID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudXNlciA9IHRoaXMudGVtcEFkZFVzZXIgPSB7fTtcbiAgICB0aGlzLnVzZXJWaWV3ID0gJ21vZHVsZXMvdXNlcnMvdmlld3MvdXNlci1hZGQuaHRtbCc7XG4gIH07XG5cbiAgVXNlcnNDb250cm9sbGVyLnByb3RvdHlwZS5zYXZlQWRkID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudGVtcEFkZFVzZXIuaWQgPSBEYXRlLm5vdygpICsgJy4nICsgTWF0aC5yYW5kb20oKTtcbiAgICAvLyB0aGlzLnVzZXIgPSBhbmd1bGFyLmNvcHkodGhpcy50ZW1wQWRkVXNlcik7XG4gICAgdGhpcy51c2VyID0gdGhpcy50ZW1wQWRkVXNlcjtcbiAgICB0aGlzLnVzZXJzLnB1c2godGhpcy51c2VyKTtcbiAgICB0aGlzLnVzZXJWaWV3ID0gJ21vZHVsZXMvdXNlcnMvdmlld3MvdXNlci12aWV3Lmh0bWwnO1xuICB9O1xuXG5cbiAgVXNlcnNDb250cm9sbGVyLnByb3RvdHlwZS5nb0VkaXQgPSBmdW5jdGlvbiAodXNlcikge1xuICAgIHRoaXMuZWRpdFVzZXIgPSB1c2VyO1xuICAgIHRoaXMudGVtcEVkaXRVc2VyID0gYW5ndWxhci5jb3B5KHVzZXIpO1xuICAgIHRoaXMudXNlclZpZXcgPSAnbW9kdWxlcy91c2Vycy92aWV3cy91c2VyLWVkaXQuaHRtbCc7XG4gIH07XG5cbiAgVXNlcnNDb250cm9sbGVyLnByb3RvdHlwZS5zYXZlRWRpdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBkZWxldGUgdGhpcy50ZW1wRWRpdFVzZXIuaWQ7XG4gICAgYW5ndWxhci5leHRlbmQodGhpcy5lZGl0VXNlciwgdGhpcy50ZW1wRWRpdFVzZXIpO1xuICAgIHRoaXMudXNlciA9IHRoaXMuZWRpdFVzZXI7XG4gICAgdGhpcy51c2VyVmlldyA9ICdtb2R1bGVzL3VzZXJzL3ZpZXdzL3VzZXItdmlldy5odG1sJztcbiAgfTtcblxuICBVc2Vyc0NvbnRyb2xsZXIucHJvdG90eXBlLmNhbmNlbEVkaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy51c2VyID0gdGhpcy5lZGl0VXNlcjtcbiAgICB0aGlzLnVzZXJWaWV3ID0gJ21vZHVsZXMvdXNlcnMvdmlld3MvdXNlci12aWV3Lmh0bWwnO1xuICB9O1xuXG59O1xuIl19
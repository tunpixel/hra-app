'use strict';

var hraApp = require('./../../common/app');

require('./../../common/paginateTo-filter')(hraApp);


hraApp.controller('MainController', MainController);

function MainController($http) {

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

      $http.get('/api/data.JSON', {
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

MainController.prototype.reset = function () {
  this.users.length = 0;
  this.user = null;
  this.page = 0;
  this.loading = false;
  this.completed = false;
};

MainController.prototype.select = function (user) {
  this.user = user;
};


MainController.prototype.goAdd = function () {
  this.user = this.tempAddUser = {};
  this.userView = 'modules/users/views/user-add.html';
};

MainController.prototype.saveAdd = function () {
  this.tempAddUser.id = Date.now() + '.' + Math.random();
  // this.user = angular.copy(this.tempAddUser);
  this.user = this.tempAddUser;
  this.users.push(this.user);
  this.userView = 'modules/users/views/user-view.html';
};


MainController.prototype.goEdit = function (user) {
  this.editUser = user;
  this.tempEditUser = angular.copy(user);
  this.userView = 'modules/users/views/user-edit.html';
};

MainController.prototype.saveEdit = function () {
  delete this.tempEditUser.id;
  angular.extend(this.editUser, this.tempEditUser);
  this.user = this.editUser;
  this.userView = 'modules/users/views/user-view.html';
};

MainController.prototype.cancelEdit = function () {
  this.user = this.editUser;
  this.userView = 'modules/users/views/user-view.html';
};

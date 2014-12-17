'use strict';

module.exports = function (ngApp) {

  require('./../../common/paginateTo-filter')(ngApp);

  require('./users.entity')(ngApp);

  ngApp.controller('UsersController', UsersController);

  function UsersController($scope, $http, UserEntity, ngTableParams, $filter) {

    var scope = this;

    this.userView = 'modules/users/views/user-view.html';

    // list of users
    this.users = [];

    // selected user
    this.user = null;;

    // server-side page size
    this.pageSize = 100;

    // loading indicator
    this.loading = false;


    this.load = function () {
      if (!scope.loading) {
        scope.loading = true;

        if (!scope.users) {
          scope.page = 0;
        }

        var params = {
          page: scope.page,
          count: scope.pageSize
        };

        // $http.get('http://hra-backend.entrydns.org/users', {
        //   params: params
        // }).success(function (data) {

        //   if (!scope.users) {
        //     scope.users = [];
        //   }

        //   if (data.users && data.users.length) {
        //     Array.prototype.push.apply(scope.users, data.users);
        //     scope.page++;
        //   }

        //   if (data.users.length < scope.pageSize) {
        //     scope.completed = true;
        //   }

        // }).error(function (err) {
        //   console.error(err);
        // }).finally(function () {
        //   // $timeout(function () {
        //   scope.loading = false;
        //   // }, 500);
        // });

        UserEntity.query(function success(response) {

          if (!scope.users) {
            scope.users = [];
          }

          if (response && response.length) {
            Array.prototype.push.apply(scope.users, response);
            scope.page++;
            $scope.$broadcast('ngTableAfterReloadData');
          }

          if (response.length < scope.pageSize) {
            scope.completed = true;
          }

          scope.loading = false;
        }, function failure(error) {
          console.error(error);
        });
      }
    };

    this.tableParams = new ngTableParams({
      page: 1,
      count: 10,
    }, {
      total: 0,
      getData: function ($defer, params) {
        var filteredData = params.filter() ?
          $filter('filter')(scope.users, params.filter()) :
          scope.users;
        var orderedData = params.sorting() ?
          $filter('orderBy')(filteredData, params.orderBy()) :
          scope.users;

        params.total(orderedData.length);
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });

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

  UsersController.prototype.goDelete = function (user) {
    var index = this.users.indexOf(user);
    if (index > -1) {
      if (confirm("Do you really want to delete " + user.firstname + " " + user.lastname + "?")) {
        this.users.splice(index, 1);
        this.user = null;
      }
    }
  };


};

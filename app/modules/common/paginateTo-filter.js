'use strict';

module.exports = function (ngApp) {

  /**
   * Usage: {{ expresseion | paginateTo:pageSize:page }}
   * param pageSize :
   * param page : page index starting from 1
   */
  ngApp.filter('paginateTo', function () {
    return function paginateTo_filter(inputList, pageSize, page) {
      var index = (page - 1) * pageSize;
      return inputList.slice(index, index + pageSize);
    };
  });

};

'use strict';

angular.module('primeMonitoringServicesApp')
  .controller('ShipListCtrl', function ($http) {
    var vm = this;
    vm.vessels = [];

    $http.get('/api/ships').success(function (vessels) {
      vm.vessels = vessels;
    });

  });

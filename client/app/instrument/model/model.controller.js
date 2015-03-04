'use strict';

angular.module('primeMonitoringServicesApp')
  .controller('modelCtrl', function ($http) {
    var vm = this;
    vm.instruments = {};

    $http.get('/api/instruments').success(function (instruments) {
      vm.instruments = instruments;
    });

  });



'use strict';

angular.module('primeMonitoringServicesApp')
  .controller('modelCtrl', function ($http) {
    var vm = this;
    vm.instruments = {};

    vm.promise = $http.get('/api/instruments').success(function (instruments) {
      vm.instruments = instruments;
    });

  });



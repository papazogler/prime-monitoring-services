'use strict';

angular.module('primeMonitoringServicesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ship', {
        templateUrl: 'app/ship/shipList/shipList.html',
        controller: 'ShipListCtrl',
        controllerAs: 'vm'
      })
      .when('/ship/:id', {
        templateUrl: 'app/ship/instrumentList/instrumentList.html',
        controller: 'InstrumentListCtrl',
        controllerAs: 'vm'
      });
  });

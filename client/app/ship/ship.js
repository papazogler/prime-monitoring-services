'use strict';

angular.module('primeMonitoringServicesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ships', {
        url:'/inventory',
        templateUrl: 'app/ship/shipList/shipList.html',
        controller: 'ShipListCtrl',
        controllerAs: 'vm'
      })
      .state('ship', {
        url:'/inventory/:id',
        templateUrl: 'app/ship/instrumentList/instrumentList.html',
        controller: 'InstrumentListCtrl',
        controllerAs: 'vm'
      });
  });

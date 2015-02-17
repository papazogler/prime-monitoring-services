'use strict';

angular.module('primeMonitoringServicesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url:'/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      });
  });

'use strict';

angular.module('primeMonitoringServicesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/admin/createUser', {
        templateUrl: 'app/admin/createUser/createUser.html',
        controller: 'CreateUserCtrl'
      })
  });

'use strict';

angular.module('primeMonitoringServicesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .state('createUser', {
        url:'/admin/createUser',
        templateUrl: 'app/admin/createUser/createUser.html',
        controller: 'CreateUserCtrl'
      });
  });

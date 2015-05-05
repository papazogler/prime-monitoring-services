'use strict';

angular.module('primeMonitoringServicesApp')
    .config(function ($stateProvider) {
      $stateProvider
          .state('contacts', {
            url: '/contacts',
            templateUrl: 'app/contacts/contacts.html',
            controller: 'ContactsCtrl'
          });
  });

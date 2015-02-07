'use strict';

angular.module('primeMonitoringServicesApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.vessels = [];

    $http.get('/api/ships').success(function (vessels) {
      $scope.vessels = vessels;
    });

  });

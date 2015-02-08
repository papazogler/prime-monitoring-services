'use strict';

angular.module('primeMonitoringServicesApp')

  .controller('CreateUserCtrl', function ($scope, Auth, $http, $location) {

    $scope.user = {};
    $scope.user.s1data = {};
    $scope.step = 1;
    $scope.searchText = '';
    $scope.searchPage = 1;
    $scope.totalItems = 0;
    $scope.doNotProceed = true;
    $scope.hidden = true;
    $scope.errors = {};


    $scope.custs = [];
    $scope.setStep = function (step) {
      $scope.step = step;
    };


    //$http.get('/api/customers').success(function (custs) {
    //  $scope.custs = custs;
    //});

    $scope.search = function () {

      $http.get('/api/customers/?name=' + $scope.searchText + '&page=' + $scope.searchPage).success(function (results) {
        $scope.totalItems = results.count;
        $scope.hidden = results.count === 0;
        $scope.custs = results.custs;
      });
    };

    $scope.pageChanged = function () {
      $scope.search();
    };

    $scope.getClass = function (cust) {
      if ($scope.user.s1data.id === cust.id) {
        return 'list-group-item active';
      } else {
        return 'list-group-item';
      }
    };

    $scope.select = function (cust) {
      $scope.user.s1data = cust;
      $scope.user.email = cust.email;
      $scope.user.name = cust.name;
      $scope.doNotProceed = false;
    };

    $scope.create = function (form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.createUser($scope.user)
          .then(function () {
            // Account created, redirect to admin
            $location.path('/admin');
          })
          .catch(function (err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
      }
    };

  });

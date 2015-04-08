'use strict';

angular.module('primeMonitoringServicesApp')

  .controller('UploadCertificateCtrl', function ($scope, $http, $upload, $stateParams, $state) {
    $scope.hidden = true;
    $scope.errors = {};

    if($stateParams.id) {
      $scope.promise = $http.get('/api/instrumentCertificates/' + $stateParams.id).success(function (instrument) {
        if (instrument) {
          $scope.instrumentID = instrument.instrumentId;
          $scope.serial = instrument.serialNo;
        }
      });
    }

    $scope.save = function (form) {
      $scope.submitted = true;

      if (form.$valid) {
          var file = $scope.file;
          $upload.upload({
            method: 'PUT',
            url: '/api/instrumentCertificates/'+ $scope.instrumentID +'/'+ $scope.serial,
            fields: {'instrumentID': $scope.instrumentID, 'serial': $scope.serial},
            file: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            $state.go('adminCertificates', {}, {reload: true});
          });
      }
    };
  });

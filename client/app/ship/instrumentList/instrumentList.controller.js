'use strict';

angular.module('primeMonitoringServicesApp')
  .controller('InstrumentListCtrl', function ($http, $stateParams) {
    var vm = this;
    vm.instruments = [];

    $http.get('/api/ships/'+ $stateParams.id).success(function (instruments) {
      vm.instruments = instruments;
      if(instruments.length > 0) {
        vm.ShipName = instruments[0].ShipName;
      }
    });
  });

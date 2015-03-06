'use strict';

angular.module('primeMonitoringServicesApp')
  .controller('logBookCtrl', function ($http, $stateParams) {
    var vm = this;
    vm.modelId = $stateParams.id;
    vm.promise = $http.get('/api/instruments/'+ $stateParams.id + '/serials/' + $stateParams.sncode).success(function (instr) {
      vm.modelName = instr.name;
      vm.logs = instr.logs;
    });

  });



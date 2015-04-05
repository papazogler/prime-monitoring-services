'use strict';

angular.module('primeMonitoringServicesApp')
  .controller('InstrumentPageCtrl', function ($http, $stateParams, $cookieStore) {
    var vm = this;

    vm.promise = $http.get('/api/instruments/'+ $stateParams.id + '/' + $stateParams.serial ).success(function (instrument) {
      vm.instrument = instrument;
      vm.instrument.id = $stateParams.id;
      vm.instrument.serial = $stateParams.serial;
      vm.imageMissing = !vm.instrument.image;
      vm.showNotFound = !vm.imageMissing;
      vm.certificateMissing = !vm.instrument.certificateLink;
      vm.webpageMissing = !vm.instrument.webpage;
      vm.simulationMissing = !vm.instrument.simulation;

      for (var i = 0; i < vm.instrument.documents.length; i++) {
        var doc = vm.instrument.documents[i];
        var fileLink = '/api/instruments/file/' + doc.docId;
        doc.downloadLink = fileLink + '?access_token=' + $cookieStore.get('token');
      }
      vm.sparePromise = $http.get('/api/instruments/' + $stateParams.id + '/spares').success(function (spares) {
        vm.instrument.spares = spares;
      });

    });

    vm.tabData = [
      {
        heading: 'Documents',
        route: 'instrument.docs'
      },
      {
        heading: 'FAQ',
        route: 'instrument.faq'
      },
      {
        heading: 'Spare parts',
        route: 'instrument.spares'
      }
    ];

  });



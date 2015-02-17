'use strict';

angular.module('primeMonitoringServicesApp')
  .controller('InstrumentPageCtrl', function ($http, $stateParams, $cookieStore) {
    var vm = this;
    vm.instrument = {};

    $http.get('/api/instruments/'+ $stateParams.id).success(function (instrument) {
      vm.instrument = instrument;
      vm.imageMissing = !vm.instrument.image;
      vm.showNotFound = !vm.imageMissing;

      for (var i = 0; i < vm.instrument.documents.length; i++) {
        var doc = vm.instrument.documents[i];
        var fileLink = '/api/instruments/file/' + doc.docId;
        doc.downloadLink = fileLink + '?access_token=' + $cookieStore.get('token');
      }
      $http.get('/api/instruments/' + $stateParams.id + '/spares').success(function (spares) {
        vm.instrument.spares = spares;
      });

      $http.get('/api/instruments/' + $stateParams.id + '/serials').success(function (serials) {
        vm.instrument.serials = serials;
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
      },
      {
        heading: 'Instruments',
        route: 'instrument.serials'
      }
    ];

  });



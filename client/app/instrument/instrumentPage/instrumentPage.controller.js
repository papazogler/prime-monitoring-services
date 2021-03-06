'use strict';

angular.module('primeMonitoringServicesApp')
  .controller('InstrumentPageCtrl', function ($http, $stateParams, $cookieStore) {
    var vm = this;

    vm.promise = $http.get('/api/instruments/'+ $stateParams.id + '/serials/' + $stateParams.serial ).success(function (instrument) {
      vm.instrument = instrument;
      if(instrument.certificate) {
        vm.certificateLink = instrument.certificate.path;
        vm.filename = instrument.certificate.name;
      }
      vm.instrument.id = $stateParams.id;
      vm.instrument.serial = $stateParams.serial;
      vm.showImage = !!vm.instrument.image;
      vm.showIimageUrl = !!vm.instrument.imageUrl && !vm.showImage;
      vm.showNotFound = !vm.showImage && !vm.showIimageUrl;
      vm.certificateMissing = !vm.certificateLink;
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

      vm.logBookPromise = $http.get('/api/instruments/' + $stateParams.id + '/serials/' + $stateParams.serial + '/logbook').success(function (instr) {
        //vm.modelName = instr.name;
        vm.logs = instr.logs;
      });
    });

    vm.tabData = [
      {
        heading: 'Documents',
        route: 'instrument.docs'
      },
      {
        heading: 'Media',
        route: 'instrument.faq'
      },
      {
        heading: 'Spare parts',
        route: 'instrument.spares'
      },
      {
        heading: 'Records',
        route: 'instrument.logBook'
      }
    ];

  });



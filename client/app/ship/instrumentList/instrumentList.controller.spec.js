'use strict';

describe('Controller: InstrumentListCtrl', function () {

  // load the controller's module
  beforeEach(module('primeMonitoringServicesApp'));

  var InstrumentListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstrumentListCtrl = $controller('InstrumentListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

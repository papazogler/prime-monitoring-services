'use strict';

describe('Controller: ShipListCtrl', function () {

  // load the controller's module
  beforeEach(module('primeMonitoringServicesApp'));

  var ShipCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShipCtrl = $controller('ShipListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

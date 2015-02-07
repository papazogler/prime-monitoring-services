'use strict';

describe('Controller: CreateUserCtrl', function () {

  // load the controller's module
  beforeEach(module('primeMonitoringServicesApp'));

  var CreateUserCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateUserCtrl = $controller('CreateUserCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

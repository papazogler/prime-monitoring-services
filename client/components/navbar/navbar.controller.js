'use strict';

angular.module('primeMonitoringServicesApp')
  .controller('NavbarCtrl', function ($location, Auth) {
    var vm = this;
    vm.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    vm.isCollapsed = false;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.isShipHolder = Auth.isShipHolder;
    vm.getCurrentUser = Auth.getCurrentUser;

    vm.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    vm.isActive = function(route) {
      return route === $location.path();
    };
  });

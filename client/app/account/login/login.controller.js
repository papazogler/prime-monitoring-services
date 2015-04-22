'use strict';

angular.module('primeMonitoringServicesApp')
	.controller('LoginCtrl', function ($scope, Auth, $location) {
		$scope.user = {};
		$scope.errors = {};

		$scope.login = function (form) {
			$scope.submitted = true;

			if (form.$valid) {
				Auth.login({
					username: $scope.user.username,
					password: $scope.user.password
				})
					.then(function () {
						// Logged in, redirect to home
						Auth.isAdminAsync(function (isAdmin) {
							if (isAdmin) {
								$location.path('/admin')
							} else {
								$location.path('/ship');
							}
						});
					})
					.catch(function (err) {
						$scope.errors.other = err.message;
					});
			}
		};

	});

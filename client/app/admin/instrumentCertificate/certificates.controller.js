/**
 * Created by Stavros on 8/4/2015.
 */
'use strict';

angular.module('primeMonitoringServicesApp')
	.controller('CertificatesCtrl', function ($http) {
		var vm = this;
		vm.certificates = [];

		vm.promise = $http.get('/api/instrumentCertificates').success(function (results) {
			vm.certificates = results;
		});

		vm.delete = function (cert) {
			vm.promise = $http.delete('/api/instrumentCertificates/' + cert._id).success(function () {
				angular.forEach(vm.certificates, function (c, i) {
					if (c === cert) {
						vm.certificates.splice(i, 1);
					}
				});
			});
		};
	});


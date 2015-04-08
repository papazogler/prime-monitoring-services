'use strict';

angular.module('primeMonitoringServicesApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('admin', {
				url: '/admin',
				templateUrl: 'app/admin/admin.html',
				controller: 'AdminCtrl'
			})
			.state('createUser', {
				url: '/admin/createUser',
				templateUrl: 'app/admin/createUser/createUser.html',
				controller: 'CreateUserCtrl'
			})
			.state('adminCertificates', {
				url: '/admin/certificates',
				templateUrl: 'app/admin/instrumentCertificate/certificates.html',
				controller: 'CertificatesCtrl',
				controllerAs: 'vm'
			})
			.state('uploadCertificate', {
				url: '/admin/certificates/upload',
				templateUrl: 'app/admin/instrumentCertificate/uploadCertificate.html',
				controller: 'UploadCertificateCtrl'
			})
			.state('editCertificate', {
				url: '/admin/certificates/:id',
				templateUrl: 'app/admin/instrumentCertificate/uploadCertificate.html',
				controller: 'UploadCertificateCtrl'
			});
	});

'use strict';

angular.module('primeMonitoringServicesApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('model', {
				url: '/instruments',
				templateUrl: 'app/instrument/model/model.html',
				controller: 'modelCtrl',
				controllerAs: 'vm'
			})
			.state('instrument', {
				url: '/instruments/:id/:serial',
				templateUrl: 'app/instrument/instrumentPage/instrumentPage.html',
				controller: 'InstrumentPageCtrl',
				controllerAs: 'vm'
			})
			.state('instrument.docs', {
				url: '/#documents',
				templateUrl: 'app/instrument/instrumentPage/instrumentPageDocs.html'
			})
			.state('instrument.faq', {
				url: '/#faq',
				templateUrl: 'app/instrument/instrumentPage/instrumentPageFaq.html'
			})
			.state('instrument.spares', {
				url: '/#spares',
				templateUrl: 'app/instrument/instrumentPage/instrumentPageSpares.html'
			})
			.state('instrument.logBook', {
				url: '/#logBook',
				templateUrl: 'app/instrument/instrumentPage/instrumentPageLogBook.html'
			});
	});

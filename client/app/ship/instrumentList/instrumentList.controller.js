'use strict';

angular.module('primeMonitoringServicesApp')
	.controller('InstrumentListCtrl', function ($http, $stateParams, $filter, ngTableParams) {
		var vm = this;

		vm.getClassForDate = function (date) {
			var curDate = new Date();
			var expDate = Date.parse(date);
			if (expDate <= curDate) {
				return 'label label-danger';
			}
			curDate.setMonth(curDate.getMonth() + 1);
			if (expDate <= curDate) {
				return 'label label-warning';
			}
			return '';
		};

		vm.getClassForStatus = function (status) {
			var myClass = '';
			switch (status) {
				case 'Operative':
					myClass = 'label label-success';
					break;
				case 'Defective':
					myClass = 'label label-warning';
					break;
				case 'Beyond Repair':
					myClass = 'label label-danger';
					break;
				case 'In Service':
					myClass = 'label label-info';
					break;
				case 'History':
					myClass = 'label label-default';
					break;
			}

			return myClass;
		};


		vm.promise = $http.get('/api/ships/' + $stateParams.id).success(function (instruments) {
			if (instruments.length > 0) {
				vm.ShipName = instruments[0].ShipName;
			}

			vm.tableParams = new ngTableParams({
				page: 1,            // show first page
				count: instruments.length// count per page
			}, {
				counts: [], // hide page counts control
				total: 1,  // value less than count hide pagination
				groupBy: 'category',
				getData: function ($defer, params) {
					var orderedData = params.sorting() ?
						$filter('orderBy')(instruments, vm.tableParams.orderBy()) :
						instruments;
					$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				}
			});
		});
	});

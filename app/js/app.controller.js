(function(){
	'use strict';

	angular.module('app')
	.controller('AppController', AppController);

	AppController.$inject = ['$scope', 'GithubSearch', '$window', '$mdToast'];

	function AppController($scope, GithubSearch, $window, $mdToast){
		var vm = this;

		vm.openRepository = openRepository;
		vm.repositories = [];
		vm.searching = false;
		vm.searchRepositories = searchRepositories;

		init();

		function init(){
			vm.searching = false;

			getLastSearch();			
		}

		function getLastSearch() {
			var search = GithubSearch.getLastSearch();

			if(search){
				vm.searchTerm = search.config.params.q;
				vm.totalItems = search.data.total_count;
				vm.repositories = search.data.items;
			}
		}

		function openRepository(url){
			$window.open(url, '_blank');
		}

		function searchError(){
			$mdToast.show(
	      $mdToast.simple()
	        .textContent('Error: You are Offline!')
	        .toastClass('md-top')
	        .hideDelay(5000)
	    );
		}

		function searchSuccess(resp){
			vm.repositories = resp.data.items;
			vm.totalItems = resp.data.total_count;
		}
		
		function searchRepositories(term){
			vm.searching = true;
			GithubSearch.repositories(term)
			.then(searchSuccess)
			.catch(searchError)
			.finally(function(){vm.searching = false;});
		}
	}
})();
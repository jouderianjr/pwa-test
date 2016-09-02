(function(){
	'use strict';

	angular.module('app')
	.controller('AppController', AppController);

	AppController.$inject = ['$scope', 'GithubSearch'];

	function AppController($scope, GithubSearch){
		var vm = this;

		vm.repositories = [];
		vm.searching = false;
		vm.searchRepositories = searchRepositories;
		vm.searchTerm = 'angular';
		vm.totalItems;


		init();

		function init(){
			vm.searching = false;
		}

		function searchRepositories(term){
			vm.searching = true;
			console.log('term = '+term);
			GithubSearch.repositories(term)
			.then(function(resp){
				console.log('deu certo = '+resp.data.total_count);
				console.log(resp.data);
				vm.repositories = resp.data.items;
				vm.totalItems = resp.data.total_count;
			})
			.catch(function(err){
				console.log(err);
				console.log('deu erro');
			})
			.finally(function(){
				vm.searching = false;
			});
		}
	}
})();
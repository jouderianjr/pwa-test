(function(){
	'use strict';
	angular.module('github')
	.factory('GithubSearch', GithubSearch);

	GithubSearch.$inject = ['$http'];

	function GithubSearch($http){

		function _repositories(term){

			var url = 'https://api.github.com/search/repositories'
			return $http.get(url, {params: {q: term}});
		}

		return {
			repositories: _repositories
		}
	}
})();
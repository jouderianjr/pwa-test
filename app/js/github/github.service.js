(function(){
	'use strict';
	angular.module('github')
	.factory('GithubSearch', GithubSearch);

	GithubSearch.$inject = ['$http', 'localStorageService'];

	function GithubSearch($http, localStorageService){

		function _getLastSearch(){	
			return localStorageService.get('lastSearch');
		}

		function _repositories(term){
			var url = 'https://api.github.com/search/repositories'
			return $http.get(url, {params: {q: term}}).then(function(response){
				localStorageService.set('lastSearch', response);

				return response
			});
		}

		return {
			getLastSearch: _getLastSearch,
			repositories: _repositories
		}
	}
})();
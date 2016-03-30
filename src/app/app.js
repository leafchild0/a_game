/**
 * Created by: leafchild
 * Date: 2/19/16
 * Time: 19:02
 */

'use strict';

angular
	  .module('aGame', [ 'ngResource', 'ui.router', 'ui.bootstrap', 'ngAside', 'ngTagsInput' ]);

angular
	  .module('aGame')
	  .config(routerConfig)
	  .directive('navbar', navbar)
	  .constant('baseURL', 'http://localhost:3000/');

/** @ngInject */
function routerConfig( $stateProvider, $urlRouterProvider, $locationProvider ) {
	$stateProvider
		  .state('main', {
			  url:          '/',
			  templateUrl:  'app/partials/main.html',
			  controller:   'MainController',
			  controllerAs: 'main'
		  })
		  .state('login', {
			  url:          '/login',
			  templateUrl:  'app/partials/login.html',
			  controller:   'LoginController',
			  controllerAs: 'login'
		  });

	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
}


/** @ngInject */
function navbar() {
	return {
		restrict:         'E',
		templateUrl:      'app/partials/navbar.html',
		controller:       'MainController',
		controllerAs:     'vm',
		bindToController: true
	};
}


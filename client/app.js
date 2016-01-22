'use strict';

angular.module('yelpNodeApp', [
  'yelpNodeApp.auth',
  'yelpNodeApp.admin',
  'yelpNodeApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ep.common',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider,$stateProvider, $locationProvider) {

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
      });
      
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });

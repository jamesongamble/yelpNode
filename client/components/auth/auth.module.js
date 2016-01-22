'use strict';

angular.module('yelpNodeApp.auth', [
  'yelpNodeApp.constants',
  'yelpNodeApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

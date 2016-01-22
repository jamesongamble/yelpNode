'use strict';

angular.module('yelpNodeApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = {
      left: [
        {
          'title': 'Home',
          'link': '/'
        },
        {
          'title': 'Item 1',
          'link': '/item1'
        },
        {
          'title': 'Item 2',
          'link': '/item2'
        }
      ],
    };

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
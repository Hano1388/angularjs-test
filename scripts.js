/*jshint esversion: 6 */
var app = angular.module('main', ['ngRoute']);

// TODO: writing a service for user authentication

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: './components/welcome.html',
    controller: 'LoginController'
  }).when('/home', {
    templateUrl: './components/home.html',
    controller: 'LoginController'
  }).otherwise({
    template: '404 Resource Not Found'
  });
});

app.factory('DataProvider', function($rootScope, $http) {
  return{
    login: function(user) {
      $http({
        url: 'https://dev.sitemax.build/api/sign-in?schema=name,avatar',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Type': 'browser'
        },
        data: { username: user.username, password: user.password }
      }).then(function(response) {
        $rootScope.userInfo = response.data;
      }).then(function() {
        $http({
          method: 'GET',
          url: 'https://dev.sitemax.build/api/projects?schema=name,number',
          headers: {
            'Content-Type': 'application/json',
            'X-Authtoken': $rootScope.userInfo.authtoken
          },
        }).then(function(response) {
          $rootScope.projects = response.data;
        });
      });
    }
  };
});

app.controller('LoginController', function($scope, $location, DataProvider) {
  // var { username, password } = $scope;
  $scope.login = function() {
    DataProvider.login($scope);
    // add user authentication here
    $location.path('/home');
  };
});

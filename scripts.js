/*jshint esversion: 6 */
var app = angular.module('main', ['ngRoute']);

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

app.controller('LoginController', function($scope, $http, $location) {
  $scope.login = function() {
    var { username, password } = $scope;
    $http({
      url: 'https://dev.sitemax.build/api/sign-in?schema=name,avatar',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'browser'
      },
      data: { username, password }
    }).then(function(response) {
      $scope.userInfo = response.data;
      console.log(response.data);
    }).then(function() {
      $http({
        method: 'GET',
        url: 'https://dev.sitemax.build/api/projects?schema=name,number',
        headers: {
          'Content-Type': 'application/json',
          'X-Authtoken': $scope.userInfo.authtoken
        },
      }).then(function(response) {
        $scope.projects = response.data;
      }).then(function() {
        $location.path('/home');
      });
    });
  };
});

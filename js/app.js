'use strict';

/* App Module */

var myreddit = angular.module('myreddit', [
  'ui.router',
  'angularControllers',
  'angularServices',
  'Devise'
]);


myreddit
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/home.html',
          controller: 'MainCtrl'
        });

      $stateProvider
        .state('posts', {
          url: '/posts/{id}',
          templateUrl: '/posts.html',
          controller: 'PostsCtrl'
        });

      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'auth/_login.html',
          controller: 'AuthCtrl',
          onEnter: ['$state', 'Auth', function($state, Auth){
            Auth.currentUser().then(function (){
              $state.go('home');
            })
          }]
        })
        .state('register', {
          url: '/register',
          templateUrl: 'auth/_register.html',
          controller: 'AuthCtrl',
          onEnter: ['$state', 'Auth', function($state, Auth){
            Auth.currentUser().then(function (){
              $state.go('home');
            })
          }]
        });

      $urlRouterProvider.otherwise('home');
    }
  ])

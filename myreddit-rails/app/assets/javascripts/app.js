'use strict';

/* App Module */

var myreddit = angular.module('myreddit', [
  'ui.router',

  'templates',
  'angularControllers',
  'angularServices',
  'Devise'
]);

var angularControllers = angular.module('angularControllers', [])
var angularServices = angular.module('angularServices', []);

myreddit
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'home/_home.html',
          controller: 'MainCtrl',
          resolve: {
            postPromise: ['posts', function(posts){
              return posts.getAll();
            }]
          }

        });


      $stateProvider
        .state('posts', {
          url: '/posts/{id}',
          templateUrl: 'posts/_posts.html',
          controller: 'PostsCtrl',
          resolve: {
            post: ['$stateParams', 'posts', function($stateParams, posts){
              return posts.get($stateParams.id);
            }]
          }
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

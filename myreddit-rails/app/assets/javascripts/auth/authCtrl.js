'use strict';

var angularControllers = angular.module('angularControllers')

angularControllers.controller('AuthCtrl', [
    '$scope',
    '$state',
    'Auth',
    function($scope, $state, Auth) {
      $scope.login = function(){
        Auth.login($scope.user).then(function(){
          // $scope.loggedIn = true;
          $state.go('home');
        });
      };

      $scope.register = function(){
        Auth.register($scope.user).then(function(){
          $state.go('home');
        })
      }
    }
  ]);

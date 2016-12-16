angular.module('starter', ['ionic', 'starter.controllers', 'starter.services']).run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  }).state('tab.list', {
    url: '/list',
    views: {
      'tab-list': {
        templateUrl: 'templates/list.html',
        controller: 'ListCtrl'
      }
    }
  }).state('tab.detail', {
    url: '/detail/:taskId',
    views: {
      'tab-detail': {
        templateUrl: 'templates/detail.html',
        controller: 'DetailCtrl'
      }
    }
  }).state('tab.add', {
    url: '/add',
    views: {
      'tab-add': {
        templateUrl: 'templates/add.html',
        controller: 'AddCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/tab/list');
}).directive("initFromForm", function($parse) {
  return {
    link: function(scope, element, attrs) {
      var attr = attrs.initFromForm || attrs.ngModel || element.attrs('name'),
        val = attrs.value;
      $parse(attr).assign(scope, val);
    }
  };
});
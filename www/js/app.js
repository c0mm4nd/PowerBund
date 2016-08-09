// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var account;

angular.module('PowerBund', ['ionic', 'PowerBund.controllers', 'PowerBund.services', 'ui.map', 'ngCordova', 'ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('tab.forum', {
      url: '/forum',
      views: {
        'tab-forum': {
          templateUrl: 'templates/tab-forum.html',
          controller: 'ForumCtrl'
        }
      }
  })
  .state('tab.chat-detail', {
      url: '/forum/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
  })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller:  'AccountCtrl'
      }
    }
  })
  .state('tab.account-login', {
    url: '/account/login',
    views: {
      'tab-account': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('tab.account-signup', {
      url: '/account/signup',
      views: {
        'tab-account': {
          templateUrl: 'templates/signup.html',
          controller: 'SignUpCtrl'
        }
      }
  })
  .state('tab.home-plan', {
      url: '/home/plan',
      views: {
        'tab-home': {
          templateUrl: 'templates/plan.html',
          controller: 'PlanCtrl',
          cache:false
        }
      }
  })
  .state('tab.home-nearby', {
      url: '/home/nearby',
      views: {
        'tab-home': {
          templateUrl: 'templates/nearby.html',
          controller: 'NearCtrl',
          cache: false
        }
      }
  })
  .state('tab.home-poi_detail', {
      url: '/home/:listId',
      views: {
        'tab-home': {
          templateUrl: 'templates/poi_detail.html',
          controller: 'POIDetailCtrl',
          cache: false
        }
      }
  })
  .state('tab.account-detail', {
      url: '/account/:token',
      views: {
        'tab-account': {
          templateUrl: 'templates/account_detail.html',
          controller: 'AccountDetailCtrl',
          cache: false
        }
      }
  })
;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});






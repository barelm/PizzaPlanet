/**
 * Created by evronor on 02/08/2017.
 */

var app = angular.module('pizzaApp', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        // Defines a route to 'home'
        .when('/home',
            {
                title: 'פיצה פלאנט',
                controller: '',
                templateUrl: 'app/partials/home.html'
            })
        // Defines a root to 'about'
        .when('/about',
            {
                title: 'אודות',
                controller: '',
                templateUrl: 'app/partials/about.html'
            })
        .when('/branch',
            {
                title: 'סניפים',
                controller: 'BranchController',
                templateUrl: 'app/partials/Branches/Branches.html'
            })

        .otherwise({ redirectTo: '/home' });

    // Remove unnecessary prefix
    $locationProvider.hashPrefix('');
});

// Changes title according to selected navigation
app.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
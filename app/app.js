/**
 * Created by evronor on 02/08/2017.
 */

var app = angular.module('pizzaApp', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        // Defines a route to 'home'
        .when('/home',
            {
                controller: '',
                templateUrl: '../../app/partials/home.html'
            })
        // Defines a root to 'about'
        .when('/about',
            {
                controller: '',
                templateUrl: '../../app/partials/about.html'
            })
        .otherwise({ redirectTo: '/home' });
});
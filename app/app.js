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
                controller: 'HomeController',
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
        .when('/branchEdit/:branchID',
            {
                title: 'עריכת סניף',
                controller: 'BranchEditController',
                templateUrl: 'app/partials/Branches/BranchEdit.html'
            })
        // .when('/branchDelete/:branchID',
        //     {
        //         title: 'מחיקת סניף',
        //         controller: 'BranchDeleteController',
        //         templateUrl: 'app/partials/Branches/BranchDelete.html'
        //     })
        .when('/branchCreate',
            {
                title: 'יצירת סניף',
                controller: 'BranchCreateController',
                templateUrl: 'app/partials/Branches/BranchCreate.html'
            })
        .when('/branchMap',
            {
                title: 'מפת סניפים',
                controller: 'BranchMapController',
                templateUrl: 'app/partials/Branches/BranchMap.html'
            })
        .when('/branchByRegion',
            {
                title: 'סניפים לפי איזורים',
                controller: 'BranchByRegionController',
                templateUrl: 'app/partials/Branches/BranchByRegion.html'
            })
        .when('/branch/:branchID',
            {
                title: 'צפייה בסניף',
                controller: 'BranchDetailsController',
                templateUrl: 'app/partials/Branches/BranchDetails.html'
            })
        .when('/employee',
            {
                title: 'עובדים',
                controller: 'EmployeeController',
                templateUrl: 'app/partials/Employees/Employees.html'
            })
        .when('/employeeEdit/:employeeID',
            {
                title: 'עריכת עובד',
                controller: 'EmployeeEditController',
                templateUrl: 'app/partials/Employees/EmployeeEdit.html'
            })
        .when('/employeeDelete/:employeeID',
            {
                title: 'מחיקת עובד',
                controller: 'EmployeeDeleteController',
                templateUrl: 'app/partials/Employees/EmployeeDelete.html'
            })
        .when('/employeeCreate',
            {
                title: 'יצירת עובד',
                controller: 'EmployeeCreateController',
                templateUrl: 'app/partials/Employees/EmployeeCreate.html'
            })
        .when('/employeeByAges',
            {
                title: 'כמות עובדים לפי גילאים',
                controller: 'EmployeeByAgesController',
                templateUrl: 'app/partials/Employees/EmployeeByAges.html'
            })
        .when('/employeeWageByBranch',
            {
                title: 'שכר עובדים ממוצע לפי סניף',
                controller: 'EmployeeWageByBranchController',
                templateUrl: 'app/partials/Employees/EmployeeWageByBranch.html'
            })
        .when('/employee/:employeeID',
            {
                title: 'צפייה בעובד',
                controller: 'EmployeeDetailsController',
                templateUrl: 'app/partials/Employees/EmployeeDetails.html'
            })
        .when('/product',
            {
                title: 'מוצרים',
                controller: 'ProductController',
                templateUrl: 'app/partials/Products/Products.html'
            })
        .when('/productEdit/:productID',
            {
                title: 'עריכת מוצר',
                controller: 'ProductEditController',
                templateUrl: 'app/partials/Products/ProductEdit.html'
            })
        .when('/productDelete/:productID',
            {
                title: 'מחיקת מוצר',
                controller: 'ProductDeleteController',
                templateUrl: 'app/partials/Products/ProductDelete.html'
            })
        .when('/productCreate',
            {
                title: 'הוספת מוצר',
                controller: 'ProductCreateController',
                templateUrl: 'app/partials/Products/ProductCreate.html'
            })
        .when('/product/:productID',
            {
                title: 'פרטי מוצר',
                controller: 'ProductDetailsController',
                templateUrl: 'app/partials/Products/ProductDetails.html'
            })
        .otherwise({ redirectTo: '/home' });

    // Remove unnecessary prefix
    $locationProvider.hashPrefix('');
});

// Changes title according to selected navigation
app.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;

        if($rootScope.title == "פיצה פלאנט")
        {
            $rootScope.hideTitle = true;
        }
        else
        {
            $rootScope.hideTitle = false;
        }
    });
}]);
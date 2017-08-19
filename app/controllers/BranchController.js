/**
 * Created by Barmen on 04/08/2017.
 */

app.controller('BranchController', function ($scope, $http, BranchService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {

        $scope.branches = [];

        BranchService.getBranches().then(function mySuccess(response) {
            $scope.branches = response;
        }, function myError(error) {

        })
    }

    $scope.resetSearch = function () {
        $scope.branchSearch.City = "";
        $scope.branchSearch.IsKosher = "";
        $scope.branchSearch.IsDisabledAccessible = "";
    }

    $scope.propertyName = 'Name';

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    var socket = io.connect(SERVER_URL);
    socket.on('refreshBranches', function (data) {
        $scope.$apply(function() {
            $scope.branches = data;
        });
    });
});

app.controller('BranchCreateController', function ($scope, $routeParams ,$location, BranchService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        $scope.regionValues = BranchService.getRegionValues();
    }

    $scope.insertBranch = function () {
        // Add new customer
        BranchService.insertBranch($scope.newBranch).then(function mySuccess(response) {

            var socket = io.connect(SERVER_URL);
            socket.emit('branchCreated', {
                message: 'A new branch has been created: ',
                name: $scope.newBranch.Name
            });

            // Clear fields.
            $scope.newBranch.Name                 = '';
            $scope.newBranch.Region               = '';
            $scope.newBranch.City                 = '';
            $scope.newBranch.Address              = '';
            $scope.newBranch.IsKosher             = '';
            $scope.newBranch.IsDisabledAccessible = '';

            // Return to branches list view
            $location.path('/branch')
        }, function myError(error) {

        })
    }
});


app.controller('BranchDetailsController', function ($scope, $routeParams, $location, BranchService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var branchID = ($routeParams.branchID) ? ($routeParams.branchID) : 0;
        $scope.selBranch = BranchService.getBranch(branchID);

        if ($scope.selBranch === null) {
            $location.path('/branch');
        }
    }
});


app.controller('BranchDeleteController', function ($scope, $routeParams ,$location, BranchService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var branchID = ($routeParams.branchID) ? ($routeParams.branchID) : 0;
        $scope.selBranch = BranchService.getBranch(branchID);

        if ($scope.selBranch === null) {
            $location.path('/branch');
        }
    }

    $scope.deleteBranch = function () {
        BranchService.deleteBranch($scope.selBranch._id).then(function mySuccess(response) {
            // Return to branches list view
            $location.path('/branch')
        }, function myError(error) {

        })
    };
});


app.controller('BranchEditController', function ($scope, $routeParams ,$location, BranchService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var branchID = ($routeParams.branchID) ? ($routeParams.branchID) : 0;
        $scope.selBranch = BranchService.getBranch(branchID);

        if ($scope.selBranch === null) {
            $location.path('/branch');
        } else {
            $scope.regionValues = BranchService.getRegionValues();
        }
    }

    $scope.editBranch = function(){
        BranchService.editBranch($scope.selBranch).then(function mySuccess(response) {
            $scope.editBranch = {};

            // Return to branches list view
            $location.path('/branch')
        }, function myError(error) {

        });
    }
});

app.controller('BranchMapController', function ($scope, $routeParams, BranchService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        BranchService.getBranches().then(function mySuccess(response) {
            $scope.branches = response;
        }, function myError(error){

        })

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = "http://maps.google.com/maps/api/js?key=AIzaSyCij6Yc19nHcMJNb63ioB4yYgy3N6CH5aU";
        script.onload = function(){

            // Set the margin bottom of the blue wrap
            $('#blue').css("margin-bottom", "0px");

            // Set Israel as the center of the map
            var Israel = new google.maps.LatLng(31.046051, 34.851612);

            // These are options that set initial zoom level, where the map is centered globally to start, and the type of map to show
            var mapOptions = {
                zoom: 8,
                center: Israel,
                mapTypeId: google.maps.MapTypeId.G_NORMAL_MAP
            };

            // This makes the div with _id "map_canvas" a google map
            var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

            // Create the geocoder object
            var geocoder = new google.maps.Geocoder();

            // Get the branches data from the controller, in JSON format
            var branchesData = $scope.branches;

            // Using the JQuery "each" selector to iterate through the JSON list and drop marker pins
            $.each(branchesData, function (i, item) {

                var address = item.Address && ' ' && item.City;
                // Initiate a request to the Google geocoding service to get the location of the branch by the address
                geocoder.geocode({'address': address}, function(results, status) {

                    // Set marker in the relevant location on the map
                    var marker = new google.maps.Marker({
                        'position': results[0].geometry.location,
                        'map': map,
                        'title': item.Name
                    });

                    // Make the marker-pin blue
                    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')

                    // Put in some information about each JSON object - branch's name. address and phone number
                    var infowindow = new google.maps.InfoWindow({
                        content: "<div class='infoDiv'><h2><u><center>" + item.Name + "</h2></u></center>" + "<h3><center>" + item.Address + "<br>" + item.City + "</h3></center>" + "</div></div>"
                    });

                    // Finally hook up an "OnClick" listener to the map so it pops up out info-window when the marker-pin is clicked
                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.open(map, marker);
                    });
                });
            })

            console.log('Done');
        }

        document.body.appendChild(script);
    }
});

app.controller('BranchByRegionController', function ($scope, $http, BranchService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {

        $scope.branchesByRegion = [];

        $scope.propertyName = 'Region';

        $scope.sortBy = function(propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };

        BranchService.getBranchesByRegion().then(function mySuccess(response) {
            $scope.branchesByRegion = response;
        }, function myError(error) {

        })
    }
});
/**
 * Created by Barmen on 04/08/2017.
 */
//This handles retrieving data and is used by controllers. 3 options (server, factory, prov_ider) with
//each doing the same thing just structuring the functions/data differently.
app.service('BranchService', function ($http) {

    this.branches = [];
    this.branchesByRegion = [];
    var self = this;

    this.getBranches = function () {

        var url = SERVER_URL + '/Branches';

        // Get branches list from server
        return $http.get(url)
        .then(function mySucces(response) {
            self.branches = response.data;
            return response.data;
        }, function myError(response) {
        });
    };

    this.getBranchesByRegion = function () {

        var url = SERVER_URL + '/Branches/ByRegion';

        // Get branches group by according region
        return $http.get(url)
            .then(function mySucces(response) {
                self.branchesByRegion = response.data;
                return response.data;
            }, function myError(response) {
            });
    };

    this.insertBranch= function (branch) {
        var jsonBranch = JSON.stringify(branch);

        var url = SERVER_URL + '/Branches';

        return $http.post(url, jsonBranch)
            .then(function mySucces(response) {
                return response.data;
            }, function myError(response) {
            });
    };

    this.deleteBranch = function (_id) {
        var url = SERVER_URL + '/Branches/' + _id;

        return $http.delete(url)
            .then(function mySucces(response) {
                return response.data;
            }, function myError(response) {
            });
    };

    this.getBranch = function (_id) {
        // find branch according id
        for (var i = 0; i < this.branches.length; i++) {
            if (this.branches[i]._id === _id) {
                return this.branches[i];
            }
        }
        return null;
    };

    this.editBranch = function (branch) {
        var jsonBranch = JSON.stringify(angular.copy(branch));

        var url = SERVER_URL + '/Branches/' + branch._id;

        return $http.put(url, jsonBranch)
            .then(function mySuccess(response) {
                return response.data;
            }, function myError(response) {
            });
    }

    this.getRegionValues = function () {
        // Defind region values
        var regionValues = ["צפון", "שרון", "מרכז", "דרום"];
        return regionValues;
    }
});
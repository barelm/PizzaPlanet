/**
 * Created by Barmen on 04/08/2017.
 */
//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with
//each doing the same thing just structuring the functions/data differently.
app.service('BranchService', function ($http) {

    this.branches = [];
    var self = this;

    this.getBranches = function () {

        var url = 'http://localhost:3000' + '/Branches';

        return $http.get(url)
        .then(function mySucces(response) {
            self.branches = response.data;
            return response.data;
        }, function myError(response) {
            // TODO: לעשות משהו?
        });
    };

    this.insertBranch= function (branch) {
        var jsonBranch = JSON.stringify(branch);

        var url = 'http://localhost:3000' + '/Branches';

        return $http.post(url, jsonBranch)
            .then(function mySucces(response) {
                self.insertBranchLocal(branch);
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    };

    this.insertBranchLocal = function (branch) {
        branches.push({
            id: branch.id,
            Name: branch.Name,
            Region: branch.Region,
            City: branch.City,
            Address: branch.Address,
            IsKosher: branch.IsKosher,
            IsDisabledAccessible: branch.IsDisabledAccessible
        });
    }

    this.deleteBranch = function (id) {
        var url = 'http://localhost:3000' + '/Branches/' + id;

        return $http.delete(url)
            .then(function mySucces(response) {
                self.deleteBranchLocal(id);
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    };

    this.deleteBranchLocal = function (id) {
        for (var i = this.branches.length - 1; i >= 0; i--) {
            if (this.branches[i].id === id) {
                this.branches.splice(i, 1);
                break;
            }
        }
    }

    this.getBranch = function (id) {
        for (var i = 0; i < this.branches.length; i++) {
            if (this.branches[i].id === id) {
                return this.branches[i];
            }
        }
        return null;
    };

    this.editBranch = function (branch) {
        var jsonBranch = JSON.stringify(angular.copy(branch));

        var url = 'http://localhost:3000' + '/Branches/' + branch.id;

        return $http.put(url, jsonBranch)
            .then(function mySuccess(response) {
                self.editBranchLocal(branch)
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    }

    this.editBranchLocal = function (branch) {
        for (var i = this.branches.length - 1; i >= 0; i--) {
            if (this.branches[i].id === branch.id) {
                this.branches[i] = branch;
            }
        }
    }

    this.getRegionValues = function () {
        var regionValues = ["צפון","מרכז","דרום"];
        return regionValues;
    }

    // var branches = [
    //     {
    //         id: 1, Name: 'The First', Region: 'צפון', City: 'ראשון לציון', IsKosher: false, Address: "אלי ויזל 2",
    //         IsDisabledAccessible: true
    //     },
    //     {
    //         id: 2, Name: 'The Second', Region: 'מרכז', City: 'רמת גן', IsKosher: true, Address: "בן גוריון 100",
    //         IsDisabledAccessible: true
    //     },
    //     {
    //         id: 3, Name: 'The First', Region: 'מרכז', City: 'פתח תקווה', IsKosher: true, Address: "דגל ראובן 40",
    //         IsDisabledAccessible: false
    //     }
    // ];

});
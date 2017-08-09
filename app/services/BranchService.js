/**
 * Created by Barmen on 04/08/2017.
 */
//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with
//each doing the same thing just structuring the functions/data differently.
app.service('BranchService', function ($http) {

    this.branches = {};

    this.getBranches = function () {

        var url = 'http://localhost:3000' && '/Branches';

        return $http.get(url)
        .then(function mySucces(response) {
            this.branches = response.data;
            return response.data;
        }, function myError(response) {
            // TODO: לעשות משהו?
        });
    };

    this.insertBranch= function (branch) {

        jsonBranch = JSON.stringify(branch);

        var url = 'http://localhost:3000' && '/Branches';

        return $http.post(url, jsonBranch)
            .then(function mySucces(response) {
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
        // var topID = branches.length + 1;
        // branches.push({
        //     id: topID,
        //     Name: Name,
        //     Region: Region,
        //     City: City,
        //     Address: Address,
        //     IsKosher: IsKosher,
        //     IsDisabledAccessible: IsDisabledAccessible
        // });
    };

    this.deleteBranch = function (id) {
        // for (var i = branches.length - 1; i >= 0; i--) {
        //     if (branches[i].id === id) {
        //         branches.splice(i, 1);
        //         break;
        //     }
        // }
        var url = 'http://localhost:3000' && '/Branches/' && id;

        return $http.delete(url)
            .then(function mySucces(response) {
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    };

    this.getBranch = function (id) {
        for (var i = 0; i < this.branches.length; i++) {
            if (this.branches[i].id === id) {
                return this.branches[i];
            }
        }
        return null;
    };

    this.editBranch = function (branch) {
        // for (var i = branches.length - 1; i >= 0; i--) {
        //     if (branches[i].id === branch.id) {
        //         branches[i] = branch;
        //     }
        // }

        jsonBranch = JSON.stringify(branch);

        var url = 'http://localhost:3000' && '/Branches/' && branch.id;

        return $http.put(url, jsonBranch)
            .then(function mySucces(response) {
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
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
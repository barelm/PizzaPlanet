/**
 * Created by Barmen on 04/08/2017.
 */
//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with
//each doing the same thing just structuring the functions/data differently.
app.service('BranchService', function () {
    this.getBranches = function () {
        return branches;
    };

    this.insertBranch= function (Name, Region, City, IsKosher, IsDisabledAccessible) {
        var topID = branches.length + 1;
        branches.push({
            id: topID,
            Name: Name,
            Region: Region,
            City: City,
            IsKosher: IsKosher,
            IsDisabledAccessible: IsDisabledAccessible
        });
    };

    this.deleteBranch = function (id) {
        for (var i = branches.length - 1; i >= 0; i--) {
            if (branches[i].id === id) {
                branches.splice(i, 1);
                break;
            }
        }
    };

    this.getBranch = function (id) {
        for (var i = 0; i < branches.length; i++) {
            if (branches[i].id === id) {
                return branches[i];
            }
        }
        return null;
    };

    this.editBranch = function (branch) {
        for (var i = branches.length - 1; i >= 0; i--) {
            if (branches[i].id === branch.id) {
                branches[i] = branch;
            }
        }
    }

    this.getRegionValues = function () {
        var regionValues = ["צפון","מרכז","דרום"];
        return regionValues;
    }

    var branches = [
        {
            id: 1, Name: 'The First', Region: 'Center', City: 'Tel Aviv', IsKosher: false, address: "אלי ויזל 2, ראשון לציון",
            IsDisabledAccessible: true
        },
        {
            id: 2, Name: 'The Second', Region: 'North', City: 'Tel Aviv', IsKosher: true, address: "ראשון לציון",
            IsDisabledAccessible: true
        },
        {
            id: 3, Name: 'The First', Region: 'South', City: 'Tel Aviv', IsKosher: true, address: "רמת גן",
            IsDisabledAccessible: false
        }
    ];

});
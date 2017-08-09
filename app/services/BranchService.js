/**
 * Created by Barmen on 04/08/2017.
 */
//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with
//each doing the same thing just structuring the functions/data differently.
app.service('BranchService', function () {
    this.getBranches = function () {
        return branches;
    };

    this.insertBranch= function (Name, Region, City, Address, IsKosher, IsDisabledAccessible) {
        var topID = branches.length + 1;
        branches.push({
            id: topID,
            Name: Name,
            Region: Region,
            City: City,
            Address: Address,
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
            id: 1, Name: 'The First', Region: 'צפון', City: 'ראשון לציון', IsKosher: false, Address: "אלי ויזל 2",
            IsDisabledAccessible: true
        },
        {
            id: 2, Name: 'The Second', Region: 'מרכז', City: 'רמת גן', IsKosher: true, Address: "בן גוריון 100",
            IsDisabledAccessible: true
        },
        {
            id: 3, Name: 'The First', Region: 'מרכז', City: 'פתח תקווה', IsKosher: true, Address: "דגל ראובן 40",
            IsDisabledAccessible: false
        }
    ];

});
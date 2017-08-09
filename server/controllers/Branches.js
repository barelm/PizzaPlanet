/**
 * Created by evronor on 09/08/2017.
 */

exports.getAllBranches = function(req, res) {
    var branches = [
        {
            id: 1, Name: 'The First', Region: 'Center', City: 'Tel Aviv', IsKosher: false,
            IsDisabledAccessible: true
        },
        {
            id: 2, Name: 'The Second', Region: 'North', City: 'Tel Aviv', IsKosher: true,
            IsDisabledAccessible: true
        },
        {
            id: 3, Name: 'The First', Region: 'South', City: 'Tel Aviv', IsKosher: true,
            IsDisabledAccessible: false
        }
    ];

    res.send(branches);
};

exports.createBranch = function(req, res) {
    res.send("OK FROM SERVER");
};
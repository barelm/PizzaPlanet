/**
 * Created by evronor on 09/08/2017.
 */

exports.getAllBranches = function(req, res) {
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

    res.send(branches);
};

exports.createBranch = function(req, res) {
    res.send("OK FROM SERVER");
};

exports.updateBranch = function(req, res) {
    res.send("OK FROM SERVER - id: " + req.params.id);
};

exports.deleteBranch = function(req, res) {
    res.send("OK FROM SERVER - id: " + req.params.id);
};
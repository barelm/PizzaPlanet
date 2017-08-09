/**
 * Created by evronor on 09/08/2017.
 */

var branchesController = require('../controllers/Branches.js');

var express = require('express'),
    router = express.Router();

router.get('/Branches', branchesController.getAllBranches);
router.post('/Branches', branchesController.createBranch);

module.exports = router;
/**
 * Created by evronor on 09/08/2017.
 */

var branchesController = require('../controllers/Branches.js');

var express = require('express'),
    router = express.Router();

router.get('/', branchesController.getAllBranches);
router.get('/ByRegion', branchesController.getBranchesByRegion);
router.post('/', branchesController.createBranch);
router.put('/:id', branchesController.updateBranch);
router.delete('/:id', branchesController.deleteBranch);

module.exports = router;
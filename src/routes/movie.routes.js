const express = require('express');

const router = express.Router();

const movieController=require('../controllers/movie.controller');

router.get('/',movieController.index);

module.exports = router;



// router.post('/',userController.create);


// router.delete('/:id',userController.destroy);


// router.put('/:id',userController.update);


// router.get('/:id',userController.show);



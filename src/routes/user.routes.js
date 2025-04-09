const express = require('express');

const router = express.Router();

/**Importar los metodos del controlador */
const userController=require('../controllers/user.controller');
//const {index} = require(`../controllers/user.controller`);

/**Crear las rutas */

/**Ruta para el metodo index */
router.get('/',userController.index)
//router.get(`/`,index)

/**Ruta para el metodo create */
router.post('/',userController.create);

/**Ruta para el metodo destroy */
router.delete('/:id',userController.destroy);

/**Ruta para el metodo update */
router.put('/:id',userController.update);

/**Ruta para el metodo show */
router.get('/:id',userController.show);

/**Exportar el router para poder ser utilizado en otras partes de la api */
module.exports = router;
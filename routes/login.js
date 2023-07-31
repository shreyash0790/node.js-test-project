const express = require('express');
const router = express.Router();
const logincontroller=require('../controllers/login');

router.get('/GetOder', logincontroller.getOder);
router.post('/AddOder', logincontroller.addOder);


router.delete('/delete/:id',logincontroller.deleteOder)
router.put('/edit/:id',logincontroller.editOder)

module.exports=router;
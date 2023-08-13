const express= require('express'); 
const {getUserInfo,updateUserInfo}  = require('../controllers/user');  

const router= express.Router(); 

router.get('/me', getUserInfo) ;
router.put('/me',updateUserInfo); 


module.exports = router; 
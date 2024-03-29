const express =require('express'); 
const { register,login,logout,isLoggedIn} = require('../controllers/auth');

const router = express.Router(); 

router.post('/register',register); 
router.post('/login',login); 
router.get('/logout',logout); 
router.get('/is_logged_in',isLoggedIn); 

module.exports = router;  
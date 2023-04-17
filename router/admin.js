const express = require('express');
//使用express框架中的Router来进行post和get等操作
//Use the Router in the express framework to perform operations such as post and get
const router = express.Router();

//admin的具体操作被抽离至controllers文件夹下的adminController文件，方便具体维护和使用
//The specific operations of admin are extracted to the adminController file under the controllers folder, which is convenient for specific maintenance and use
const adminController = require('../controllers/adminController');

//admin login api
router.post('/adminLogin', adminController.adminLoginController);
//admin search user account api
router.get('/find', adminController.searchUserAccountController);
//admin delete user account api
router.get('/delete', adminController.deleteUserAccountController);
//admin upload music details api
router.post('/uploadDetails', adminController.uploadMusicDetailsController);


//抛出路由配置
//Export router configuration
module.exports = router;
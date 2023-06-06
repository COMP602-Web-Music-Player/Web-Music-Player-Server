const express = require('express');
//使用express框架中的Router来进行post和get等操作
//Use the Router in the express framework to perform operations such as post and get
const router = express.Router();
//import multer 将文件保存到指定的目录中，准备读取该文件
const multer = require('multer');
const upload = multer({
    //storage music file
    dest: 'file/'
})

//user的具体操作被抽离至controllers文件夹下的userController文件，方便具体维护和使用
//The specific operations of the user are extracted to the userController file under the controllers folder, which is convenient for specific maintenance and use
const userController = require('../controllers/userController');

//user login api
router.post('/userLogin', userController.userLoginController)
//user register api
router.post('/userRegister', upload.single('file'), userController.userRegisterController);

//抛出路由配置
//Export router configuration
module.exports = router;
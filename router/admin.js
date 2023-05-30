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

//admin的具体操作被抽离至controllers文件夹下的adminController文件，方便具体维护和使用
//The specific operations of admin are extracted to the adminController file under the controllers folder, which is convenient for specific maintenance and use
const adminController = require('../controllers/adminController');
//admin login api
router.post('/adminLogin', adminController.adminLoginController);
//admin search user account api
router.get('/find', adminController.findUserAccountController);
//admin delete user account api
router.get('/delete', adminController.deleteUserAccountController);
//admin upload music details api
router.get('/updateDetails', adminController.updateMusicDetailsController);
//admin search music api
router.get('/search', adminController.searchMusicController);
//admin upload music api
router.post('/upload', upload.single('file'), adminController.uploadMusicController);
//admin delete music info api
router.get('/remove', adminController.deleteMusicController);
//admin get user avatar api
router.get('/getAvatar', adminController.userGetAvatarController);

//抛出路由配置
//Export router configuration
module.exports = router;
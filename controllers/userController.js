const db = require('../config/db');
const fs = require('fs');
const ossClient = require('../config/ali-oss');
/**
 * user login logic
 */
exports.userLoginController = (req, res) =>{
    let {username, password} = req.body;
    //sql语句 查询username字段
    //sql statement query username field
    const adminSelectSql = 'SELECT username FROM user WHERE username =?';

    //sql语句 查询password字段
    //SQL statement query password field
    const passwordSelectSql = 'SELECT password FROM user WHERE password =?';

    db.query(adminSelectSql, username, (err, results) =>{
        if (err) {
            return res.send({code: 1, message:err.message});
        }

        //验证admin字段是否和数据库一致，使用 === 绝对等
        //Verify that the admin field is consistent with the database, use === to be absolutely equal
        if (results.length === 0) {
            return res.send({code: 1, message:'User Name is not correct!'});
        }

        //验证password字段是否和数据库一致，使用 === 绝对等
        //Verify that the password field is consistent with the database, use === to be absolutely equal
        db.query(passwordSelectSql, password, (err, results) =>{
            if (err) {
                return res.send({code: 1, message:err.message})
            };

            if (results.length === 0) {
                return res.send({code: 1, message:'Password is not correct!'});
            };

            res.send({code: 0, message: 'User Login Success'});
        })
    })
}

/**
 * user register logic
 */
exports.userRegisterController = async(req, res) =>{
    //定义和响应前端请求的user info的参数
    //Define and respond to the parameters of user info requested by the front end
    let{username, password, email, age} = req.body;

    //username, password 是否为空的校验
    //Check if username, password is empty
    if (!username || !password) {
        return res.send({code: 1, message: 'User Name and password cannot be empty!'})
    }

    //username 不重复
    //username cannot be repeated
    const fileContent = fs.readFileSync(req.file.path);
    
    try {
        //调用阿里云OSS对象，music file上传到阿里云OSS存储，并获取它的url
        //Call AliCloud OSS object, music file upload to AliCloud OSS storage, and get its url
        const ossResult = await ossClient.put(req.file.originalname, fileContent);
        const fileUrl = ossResult.url;
        //插入数据
        //user info insert into user schema
        const userInfoInsertSql = 'INSERT INTO user(username, password, email, avatar, age) VALUES(?, ?, ?, ?, ?)';

        db.query(userInfoInsertSql, [username, password, email, fileUrl, age], (err,results) =>{
            if (err) {
                return res.send({code: 1, message:err.message})
            };

            res.send({code: 0, message: 'User Register Success!'})
        })
        
    } catch (err) {
        console.error(err);
        return res.send({code: 1, message: 'Failed to upload'});
    }
}
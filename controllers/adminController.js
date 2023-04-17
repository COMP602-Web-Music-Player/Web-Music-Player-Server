const db = require('../config/db');

/**
 * admin login logic
 */
exports.adminLoginController = (req, res) =>{
    let {admin, adminpassword} = req.body;
    //sql语句 查询admin字段
    //sql statement query admin field
    const adminSelectSql = 'SELECT admin FROM admin WHERE admin =?';

    //sql语句 查询password字段
    //SQL statement query password field
    const passwordSelectSql = 'SELECT adminpassword FROM admin WHERE adminpassword =?';

    db.query(adminSelectSql, admin, (err, results) =>{
        if (err) {
            return res.send({code: 1, message:err.message});
        }

        //验证admin字段是否和数据库一致，使用 === 绝对等
        //Verify that the admin field is consistent with the database, use === to be absolutely equal
        if (results.length === 0) {
            return res.send({code: 1, message:'Administer account name is not correct!'});
        }

        //验证adminpassword字段是否和数据库一致，使用 === 绝对等
        //Verify that the adminpassword field is consistent with the database, use === to be absolutely equal
        db.query(passwordSelectSql, adminpassword, (err, results) =>{
            if (err) {
                return res.send({code: 1, message:err.message})
            };

            if (results.length === 0) {
                return res.send({code: 1, message:'Password is not correct!'});
            };

            //打印结果
            //print result
            res.send({code: 0, message: 'Administer Login Success'});
        })
    })
}

/**
 * admin search user account api
 */
exports.searchUserAccountController = (req, res) =>{
    let {id} = req.query;

    //sql语句，查询所有user
    //sql statement to query all users
    const searchUserSql = 'SELECT * FROM user';

    db.query(searchUserSql, [id], (err, resList) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }

        //返回一个list， resList存储所有返回的信息
        //Return a list, resList stores all returned information
        res.send({code: 0, data:{list: resList}})
    })
}

/**
 * delete user account api
 */
exports.deleteUserAccountController = (req, res) =>{
    let {id} = req.query;

    //sql语句，删除对应id的user
    //SQL statement, delete the user corresponding to the id
    const deleteUserSql = 'DELETE FROM user WHERE id =?';

    db.query(deleteUserSql, [id], (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }

        //delete success
        res.send({code: 0, message: 'Delete User Success'});
    })
}

/**
 * upload music details
 */
exports.uploadMusicDetailsController = (req, res) =>{
    let{musicName, categories, singer} = req.body;

    //sql语句，插入music详情
    //sql statement, insert music details
    const uploadMusicDetailsSql = 'INSERT INTO music(musicName, categories, singer) VALUES(?, ?, ?)';
    db.query(uploadMusicDetailsSql, [musicName, categories, singer], (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }

        res.send({code: 0, message: 'Music Details Upload Success'});
    })
}
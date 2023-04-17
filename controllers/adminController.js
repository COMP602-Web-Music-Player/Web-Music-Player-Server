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
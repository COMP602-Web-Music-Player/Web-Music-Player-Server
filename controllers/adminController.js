const db = require('../config/db');

/**
 * admin login logic
 */
exports.adminLoginController = (req, res) =>{
    let {admin, password} = req.body;
    //sql语句 查询admin字段
    //sql statement query admin field
    const adminSelectSql = 'SELECT admin FROM admin WHERE admin =?';

    //sql语句 查询password字段
    //SQL statement query password field
    const passwordSelectSql = 'SELECT password FROM admin WHERE password =?';

    db.query(adminSelectSql, admin, (err, results) =>{
        if (err) {
            return res.send({code: 1, message:err.message});
        }

        //验证admin字段是否和数据库一致，使用 === 绝对等
        //Verify that the admin field is consistent with the database, use === to be absolutely equal
        if (results.length === 0) {
            return res.send({code: 1, message:'Administer name is not correct!'});
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

            //打印结果
            //print result
            res.send({code: 0, message: 'Administer Login Success'});
        })
    })
}

/**
 * admin search user account api
 */
exports.findUserAccountController = (req, res) =>{
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
 * update music details
 */
exports.updateMusicDetailsController = (req, res) =>{
    let{id, musicName, categories, singer} = req.query;

    let sql = 'UPDATE music SET ';
    let arr = [];

    if (musicName && categories && singer) {
        sql = sql + 'musicName=?, categories=?, singer=? WHERE id=?'
        arr = [musicName, categories, singer, Number(id)]
    }else if (musicName) {
        sql = sql + 'musicName=? WHERE id=?';
        arr = [musicName, Number(id)];
    }else if (categories) {
        sql = sql + 'categories WHERE id=?';
        arr = [categories, Number(id)];
    }else if (singer) {
        sql = sql + 'singer WHERE id=?';
        arr = [singer, Number(id)];
    }

    //执行sql语句
    //run sql statement
    db.query(sql, arr, (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }
        res.send({code: 0, message: 'Update Success!'});
    })
}

/**
 * admin search music api
 */
exports.searchMusicController = (req, res) =>{
    let {id} = req.query;

    //sql语句，查询所有music
    //sql statement to query all music
    const searchUserSql = 'SELECT * FROM music';

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
 * upload music api
 */
exports.uploadMusicController = (req, res) =>{
    //定义和响应前端请求的music info的参数
    //Define and respond to the parameters of music info requested by the front end
    let {coverImage, musicName, categories, singer} = req.body;

    //插入数据
    //music info insert into music schema
    const musicInfoInsertSql = 'INSERT INTO music(coverImage, musicName, categories, singer) VALUES(?, ?, ?, ?)'

    db.query(musicInfoInsertSql, [coverImage, musicName, categories, singer], (err, results) =>{
        if (err) {
            return res.send({code: 1, message:err.message})
        };

        res.send({code: 0, message: 'Music Upload Success!'})
    })
}
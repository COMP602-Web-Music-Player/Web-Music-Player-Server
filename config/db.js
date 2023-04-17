//请求mysql，创建mysql对象\
//Request mysql, create mysql object
const mysql = require('mysql');

//创建db，使用mysql中的创建连接池方法，db接收数据库的属性
//Create db, use the createPool method in mysql, db receives the properties of the database
const db = mysql.createPool({
    host:'8.219.194.127',
    user:'root',
    password:'akarana',
    database:'web_music_player'
});

//抛出db，方便在其他文件中使用
//Export db for easy use in other files
module.exports = db;
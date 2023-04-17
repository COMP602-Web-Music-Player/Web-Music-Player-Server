const express = require('express');
const app = express();

/**
 * 解析post请求的body的数据
 * Parse the data of the body of the post request
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));

/**
 * 配置跨域的请求
 * Configure cross-domain requests
 */
const cors = require('cors');
app.use(cors());
//以上配置均需要配置在调用路由之前
//The above configurations need to be configured before calling the route

/**
 * admin相关的api,请求并配置相关的api
 * admin related api, request and configure related api
 */
const adminRouter = require('./router/admin');
app.use('/api/v1/admin', adminRouter);
/**
 * user相关的api,请求并配置相关的api
 * User-related APIs, request and configure related APIs
 */
const userRouter = require('./router/user');
app.use('/api/v1/user', userRouter);

//监听接口 3000
//listen port 3000
app.listen(3000, () =>{
    console.log('service will start at http://127.0.0.1:3000');
})
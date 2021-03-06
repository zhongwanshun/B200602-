var express = require('express');
var router = express.Router();
var User = require("../models/user.js");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { errMsg: '' });
});

router.post("/", function(req, res) {
    //获取form表单提交的登录数据
    var username = req.body.username;
    var password = req.body.password;
    var loginUser = new User({
        username: username,
        userpwd: password
    });
    //通过用户名取到用户信息
    loginUser.userInfo(function(err, result) {
        if (err) {
            res.render('index', { errMsg: err });
            return;
        }
        if (result == '') {
            res.render('index', { errMsg: '用户不存在' });
            return;
        } else {
            //判断用户密码是否填写正确  演示没做加密，等有时间再加
            if (result[0]['userpwd'] == password) {
                var user = { 'username': username };
                req.session.user = user; //保存用户session信息
                res.redirect('/main');
            } else {
                res.render('index', { errMsg: '密码有误' });
            }
        }
    });
});

module.exports = router;
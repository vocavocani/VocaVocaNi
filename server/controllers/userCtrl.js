/**
 * Created by kingw on 2016-03-20.
 */
var userModel = require('../models/userModel');
var async = require('async');
var my_conf = require('../my_config');

/*******************
 *  Register
 *  @err_code: 1=파라미터, 2=id(영문,숫자), 3=패스워드 불일치, 4=아이디존재, 10=DB에러
 ********************/
exports.register = function(req, res, next){
  var regType = /^[A-Za-z0-9+]*$/;  // only en, num
  if(!req.body.id || !req.body.nickname || !req.body.pw_1 || !req.body.pw_2) {  // parameter check
    next(1);  // err_code = 1
  }else if(!regType.test(req.body.id)){
    return res.json({
      "status": 0,
      "error": {
        "code": 2,
        "message": "id only english, number"
      }
    });
  }else if(req.body.pw_1 != req.body.pw_2){
    return res.json({
      "status": 0,
      "error": {
        "code": 3,
        "message": "password not match"
      }
    });
  }else{
    var user_data = {
      "user_id": req.body.id,
      "user_password": my_conf.do_ciper(req.body.pw_2),
      "user_nickname": req.body.nickname
    };
    userModel.register(user_data, function(status, _err){
      return res.json({
        "status": status,
        "error": _err
      });
    });
  }
};

/*******************
 *  Login
 *  @err_code: 1=파라미터, 2=아이디없음, 3=비밀번호틀림, 10=DB에러
 ********************/
exports.login = function(req, res, next){
  if(!req.body.id || !req.body.pw) {  // parameter check
    next(1);  // err_code = 1
  }else{
    var user_data = {
      "user_id": req.body.id,
      "user_password": my_conf.do_ciper(req.body.pw)
    };
    userModel.login(user_data, function(status, token, _err){
      if(!status){
        return res.status(401).json({
          "status": status,
          "token": token,
          "error": _err
        });
      }else{
        return res.json({
          "status": status,
          "token": token,
          "error": _err
        });
      }
    });
  }
};

/*******************
 *  Authenticate
 *  @err_code: 401=인증실패
 ********************/
exports.auth = function(req, res, next){
  if(!req.headers.token){
    return res.status(401).json({
      "status": 0,
      "error": {
        "code": 401,
        "message": "Not found token"
      }
    });
  }else{
    userModel.auth(req.headers.token, function(status, user_idx, _err){
      if(!status){
        return res.status(401).json({
          "status": status,
          "error": _err
        });
      }else{
        req.user_idx = user_idx;
        next();
      }
    });
  }
};
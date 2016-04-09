/**
 * Created by kingw on 2016-03-20.
 */
var userModel = require('../models/userModel');
var async = require('async');
var my_conf = require('../my_config');

/*******************
 *  Register
 ********************/
exports.register = function(req, res){
  var regType = /^[A-Za-z0-9+]*$/;  // only en, num
  if(!req.body.id || !req.body.nickname || !req.body.pw_1 || !req.body.pw_2) {  // parameter check
    return res.json({
      "status": 0,
      "error": {
        "code": 1,
        "message": "invalid parameter"
      }
    });
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
    userModel.register(user_data, function(status, message, err_code){
      var err = null;
      if(!status){
        err = {
          "code": err_code,
          "message": message
        };
      }
      return res.json({
        "status": status,
        "error": err
      });
    });
  }
};

/*******************
 *  Login
 ********************/
exports.login = function(req, res){
  console.log(req.body);
  if(req.body.id == "aa" && req.body.pw == "1234"){
    res.json({
      "status": 1,
      "username": req.body.id
    });
  }else{
    res.json({
      "status": 0
    })
  }
};
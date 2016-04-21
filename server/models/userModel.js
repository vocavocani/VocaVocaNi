/**
 * Created by kingw on 2016-04-09.
 */
var mysql = require('mysql');
var db_config = require('./db_config');
var my = require('../my_config');
var utils = require('../utils');
var async = require('async');
var jwt = require('jsonwebtoken');

var pool = mysql.createPool(db_config);

/*******************
 *  Register
 *  @param: user_data = {user_id, user_password, user_nickname}
 ********************/
exports.register = function(user_data, done){
  async.waterfall([
      function(callback){
        var sql = "SELECT user_id FROM vvn_user WHERE user_id = ?";
        pool.query(sql, [user_data.user_id], function(err, rows){  // 아이디 중복 체크
          if(err){
            var _err_1 = utils.dbError("User Register Waterfall Error_1", err);
            callback(err, _err_1);
          }else{
            if(rows.length != 0){  // 이미 아이디 존재
              var _err_2 = {
                "code": 4,
                "message": "Exist Email"
              };

              done(0, _err_2);
            }else{
              callback(null);
            }
          }
        });
      },
      function(callback){
        var sql = "INSERT INTO vvn_user SET ?";
        pool.query(sql, user_data, function(err, rows){  // 가입 시도
          if(err){
            var _err_1 = utils.dbError("User Register Waterfall Error_2", err);
            callback(err, _err_1);
          }else{
            if(rows.affectedRows == 1){
              callback(null);
            }else{
              var _err_2 = utils.dbError("User Register Waterfall Error_3");
              callback("User Register Waterfall Error_3", _err_2);
            }
          }
        });
      }
    ],
    function(err, _err){
      if(err){
        done(0, _err);
      }else{
        done(1, null);
      }
    }
  );  // waterfall
};

/*******************
 *  Login
 *  @param: user_data = {user_id, user_password}
 ********************/
exports.login = function(user_data, done){
  async.waterfall([
      function(callback){
        var sql = "SELECT user_id FROM vvn_user WHERE user_id = ?";
        pool.query(sql, [user_data.user_id], function(err, rows){  // 아이디 존재 검사
          if(err){
            var _err_1 = utils.dbError("User Login Waterfall Error_1", err);
            callback(err, null, _err_1);
          }else{
            if(rows.length == 0){  // 아이디 없음
              var _err_2 = {
                "code": 2,
                "message": "Not registration id"
              };

              callback("Not registration id", null, _err_2);
            }else{
              callback(null);
            }
          }
        });
      },
      function(callback){
        var sql =
          "SELECT user_id, user_nickname " +
          "FROM vvn_user " +
          "WHERE user_id = ? and user_password = ?";
        pool.query(sql, [user_data.user_id, user_data.user_password], function(err, rows){
          if(err){
            var _err_1 = utils.dbError("User Login Waterfall Error_2", err);
            callback(err, null, _err_1);
          }else{
            if(rows.length == 0){  // 비밀번호 틀림
              var _err_2 = {
                "code": 3,
                "message": "id password not match"
              };
              callback("id password not match", null, _err_2);
            }else{
              var profile = {'id': rows[0].user_id, 'nickname': rows[0].user_nickname};
              var token = jwt.sign(profile, my.jwt_config(), {'expiresIn': "10h"});
              callback(null, token);
            }
          }
        });
      }
    ],
    function(err, token, _err){
      if(err){
        done(0, token, _err);
      }else{
        done(1, token, null);
      }
    }
  );  // waterfall
};

/*******************
 *  Authenticate
 *  @param: token
 ********************/
exports.auth = function(token, done){
  jwt.verify(token, my.jwt_config(), function(err, decoded){
    if(err){
      var _err = {
        "code": 401,
        "message": "False token"
      };
      done(0, null, _err);
    }else{
      var sql = "SELECT user_idx FROM vvn_user WHERE user_id = ?";
      pool.query(sql, [decoded.id], function(err, rows){
        if(err){
          var _err_1 = {
            "code": 401,
            "message": "Authenticate DB error"
          };

          console.log("Authenticate DB error", err);
          done(0, null, _err_1);
        }else{
          if(rows.length == 0){
            var _err = {
              "code": 401,
              "message": "False token"
            };

            done(0, null, _err);
          }else{  // 인증 성공
            done(1, rows[0].user_idx, null);
          }
        }
      })
    }
  });
};
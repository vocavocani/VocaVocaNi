/**
 * Created by kingw on 2016-04-09.
 */
var mysql = require('mysql');
var db_config = require('./db_config');
var async = require('async');

var pool = mysql.createPool(db_config);

/*******************
 *  Register
 ********************/
exports.register = function(user_data, done){
  async.waterfall([
      function(callback){
        var sql = "SELECT user_id FROM vvn_user WHERE user_id = ?";
        pool.query(sql, [user_data.user_id], function(err, rows){  // 아이디 중복 체크
          if(err){
            console.log("User Register Waterfall Error_1", err);
            callback(err, "User Register Waterfall Error_1", 4);
          }else{
            if(rows.length != 0){  // 이미 아이디 존재
              done(0, "Exist Email", 2);
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
            console.log("User Register Waterfall Error_2", err);
            callback(err, "User Register Waterfall Error_2", 4);
          }else{
            if(rows.affectedRows == 1){
              callback(null);
            }else{
              console.log("User Register Waterfall Error_3");
              callback(err, "User Register Waterfall Error_3", 4);
            }
          }
        });
      }
    ],
    function(err, message, err_code){
      if(err){
        done(0, message, err_code);
      }else{
        done(1);
      }
    }
  );  // waterfall
};
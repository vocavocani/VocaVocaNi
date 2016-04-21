/**
 * Created by kingw on 2016-04-16.
 */
var mysql = require('mysql');
var db_config = require('./db_config');
var utils = require('../utils');
var async = require('async');

var pool = mysql.createPool(db_config);

/*******************
 *  Group Create
 *  @param: group_data = {title(string), category(Array), creator(int)}
 ********************/
exports.groupCreate = function(group_data, done){
  pool.getConnection(function(err, conn){
    if(err){
      var _err = utils.dbError("Group Create getConnection error", err);
      done(0, _err);
    }else{
      conn.beginTransaction(function(err){
        if(err){
          var _err = utils.dbError("Group Create beginTransaction error", err);
          done(0, _err);
          conn.release();
        }else{
          async.waterfall([
              function(callback){  // Group Create
                var sql = "INSERT INTO vvn_group(group_title, user_idx) VALUES (?,?)";

                conn.query(sql, [group_data.title, group_data.creator], function(err, rows){
                  if(err){
                    var _err_1 = utils.dbError("Group Create waterfall error_1", err);
                    callback(err, _err_1);
                  }else{
                    if(rows.affectedRows == 1){
                      callback(null, rows.insertId);  // rows.insertId = create group idx
                    }else{
                      var _err_2 = utils.dbError("Group Create waterfall error_2");
                      callback("Group Create waterfall error_2", _err_2);  // 임의의 에러
                    }
                  }
                });
              },
              function(group_id, callback){  // vvn_group_user insert data
                var sql = "INSERT INTO vvn_group_user(group_idx, user_idx, group_user_confirm) VALUES (?,?,?)";

                conn.query(sql, [group_id, group_data.creator, 1], function(err, rows){
                  if(err){
                    var _err_1 = utils.dbError("Group Create waterfall error_3", err);
                    callback(err, _err_1);
                  }else{
                    if(rows.affectedRows == 1){
                      callback(null, group_id);
                    }else{
                      var _err_2 = utils.dbError("Group Create waterfall error_4");
                      callback("Group Create waterfall error_4", _err_2);  // 임의의 에러
                    }
                  }
                });
              },
              function(group_id, callback){  // vvn_group_cate insert data
                var sql = "INSERT INTO vvn_group_cate(group_idx, cate_idx) VALUES ?";

                // make bulk insert data
                var data = [];
                var cate_cnt=group_data.category.length;
                for(var i=0; i < cate_cnt; i++){
                  data[i] = [];
                  data[i].push(group_id, group_data.category[i]);
                }

                conn.query(sql, [data], function(err, rows){
                  if(err){
                    var _err_1 = utils.dbError("Group Create waterfall error_5", err);
                    callback(err, _err_1);
                  }else{
                    if(rows.affectedRows == 0){
                      var _err_2 = utils.dbError("Group Create waterfall error_6");
                      callback("Group Create waterfall error_6", _err_2);  // 임의의 에러
                    }else{
                      callback(null);
                    }
                  }
                });
              }
            ],
            function(err, _err){
              if(err){
                conn.rollback(function(){
                  done(0, _err);
                  conn.release();
                });
              }else{
                conn.commit(function(err){
                  if(err){
                    var _err = utils.dbError("Group Create commit error", err);
                    done(0, _err);
                    conn.release();
                  }else{
                    done(1, null);
                    conn.release();
                  }
                });
              }
            }
          );  // waterfall
        }
      });  // beginTransaction
    }
  });
};
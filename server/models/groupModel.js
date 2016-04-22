/**
 * Created by kingw on 2016-04-16.
 */
'use strict';

const mysql = require('mysql');
const db_config = require('./db_config');
const utils = require('../utils');
const async = require('async');

const pool = mysql.createPool(db_config);

/*******************
 *  Group Create
 *  @param: group_data = {title(string), category(Array), creator(int)}
 ********************/
exports.groupCreate = (group_data, done) => {
  pool.getConnection((err, conn) => {
    if(err){
      const _err = utils.dbError("Group Create getConnection error", err);
      done(0, _err);
    }else{
      conn.beginTransaction((err) => {
        if(err){
          const _err = utils.dbError("Group Create beginTransaction error", err);
          done(0, _err);
          conn.release();
        }else{
          async.waterfall([
              (callback) => {  // Group Create
                const sql = "INSERT INTO vvn_group(group_title, user_idx) VALUES (?,?)";

                conn.query(sql, [group_data.title, group_data.creator], (err, rows) => {
                  if(err){
                    const _err_1 = utils.dbError("Group Create waterfall error_1", err);
                    callback(err, _err_1);
                  }else{
                    if(rows.affectedRows == 1){
                      callback(null, rows.insertId);  // rows.insertId = create group idx
                    }else{
                      const _err_2 = utils.dbError("Group Create waterfall error_2");
                      callback("Group Create waterfall error_2", _err_2);  // 임의의 에러
                    }
                  }
                });
              },
              (group_id, callback) => {  // vvn_group_user insert data
                const sql = "INSERT INTO vvn_group_user(group_idx, user_idx, group_user_confirm) VALUES (?,?,?)";

                conn.query(sql, [group_id, group_data.creator, 1], (err, rows) => {
                  if(err){
                    const _err_1 = utils.dbError("Group Create waterfall error_3", err);
                    callback(err, _err_1);
                  }else{
                    if(rows.affectedRows == 1){
                      callback(null, group_id);
                    }else{
                      const _err_2 = utils.dbError("Group Create waterfall error_4");
                      callback("Group Create waterfall error_4", _err_2);  // 임의의 에러
                    }
                  }
                });
              },
              (group_id, callback) => {  // vvn_group_cate insert data
                const sql = "INSERT INTO vvn_group_cate(group_idx, cate_idx) VALUES ?";

                // make bulk insert data
                let data = [];
                const cate_cnt=group_data.category.length;
                for(let i=0; i < cate_cnt; i++){
                  data[i] = [];
                  data[i].push(group_id, group_data.category[i]);
                }

                conn.query(sql, [data], (err, rows) => {
                  if(err){
                    const _err_1 = utils.dbError("Group Create waterfall error_5", err);
                    callback(err, _err_1);
                  }else{
                    if(rows.affectedRows == 0){
                      const _err_2 = utils.dbError("Group Create waterfall error_6");
                      callback("Group Create waterfall error_6", _err_2);  // 임의의 에러
                    }else{
                      callback(null);
                    }
                  }
                });
              }
            ],
            (err, _err) => {
              if(err){
                conn.rollback(() => {
                  done(0, _err);
                  conn.release();
                });
              }else{
                conn.commit((err) => {
                  if(err){
                    const _err = utils.dbError("Group Create commit error", err);
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


/*******************
 *  My Group List
 *  @param: user_idx(int)
 ********************/
exports.myGroupList = (user_idx, done) => {

};
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
 *  @param: group_data = {group_title(string), user_idx(int), cate_idx(int)}
 ********************/
exports.groupCreate = (group_data, done) => {
  pool.getConnection((err, conn) => {
    if(err){
      done(err);
    }else{
      conn.beginTransaction((err) => {
        if(err){
          done(err);
        }else{
          async.waterfall([
              (callback) => {  // Group Create
                const sql = "INSERT INTO vvn_group SET ?";

                conn.query(sql, group_data, (err, rows) => {
                  if(err){
                    callback(err);
                  }else{
                    if(rows.affectedRows == 1){
                      callback(null, rows.insertId);  // rows.insertId = create group idx
                    }else{
                      const _err = new Error("Group Create Custom Error(insert vvn_group)");
                      callback(_err);
                    }
                  }
                });
              },
              (group_id, callback) => {  // vvn_group_user insert data
                const sql = "INSERT INTO vvn_group_user(group_idx, user_idx, group_user_confirm) VALUES (?,?,?)";

                conn.query(sql, [group_id, group_data.user_idx, 1], (err, rows) => {
                  if(err){
                    callback(err);
                  }else{
                    if(rows.affectedRows == 1){
                      callback(null);
                    }else{
                      const _err = new Error("Group Create Custom Error(insert vvn_group_user)");
                      callback(_err);
                    }
                  }
                });
              }
            ],
            (err) => {
              if(err){
                conn.rollback(() => {
                  done(err);
                  conn.release();
                });
              }else{
                conn.commit((err) => {
                  if(err){
                    done(err);
                    conn.release();
                  }else{
                    done(null);
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
  const sql =
    "SELECT g.group_title, c.cate_title " +
    "FROM vvn_group g, vvn_category c " +
    "WHERE g.cate_idx = c.cate_idx AND g.user_idx = ?";

  pool.query(sql, user_idx, (err, rows) => {
    if(err){
      done(err);
    }else{
      done(null, rows);
    }
  });
};
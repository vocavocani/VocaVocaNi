/**
 * Created by kingw on 2016-04-16.
 */
'use strict';

const mysql = require('mysql');
const db_config = require('./db_config');
const utils = require('../utils');

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
          new Promise((resolve, reject) => {
              const sql = "INSERT INTO vvn_group SET ?";

              conn.query(sql, group_data, (err, rows) => {
                if(err){
                  reject(err);
                }else{
                  if(rows.affectedRows == 1){
                    resolve(rows.insertId);  // rows.insertId = create group idx
                  }else{
                    const _err = new Error("Group Create Custom Error(insert vvn_group)");
                    reject(_err);
                  }
                }
              });
            }
          ).then((group_id) => {
              return new Promise((resolve, reject) => {
                const sql = "INSERT INTO vvn_group_user(group_idx, user_idx, group_user_confirm) VALUES (?,?,?)";

                conn.query(sql, [group_id, group_data.user_idx, 1], (err, rows) => {
                  if(err){
                    reject(err);
                  }else{
                    if(rows.affectedRows == 1){
                      resolve(null);
                    }else{
                      const _err = new Error("Group Create Custom Error(insert vvn_group_user)");
                      reject(_err);
                    }
                  }
                });
              });
            }
          ).then(() => {
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
          ).catch((err) => {
            conn.rollback(() => {
              done(err);
              conn.release();
            });
          });  // Promise
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
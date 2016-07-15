/**
 * Created by kingw on 2016-04-09.
 */
'use strict';

const mysql = require('mysql');
const db_config = require('./db_config');
const my = require('../my_config');
const utils = require('../utils');
const jwt = require('jsonwebtoken');

const pool = mysql.createPool(db_config);

/*******************
 *  Register
 *  @param: user_data = {user_id, user_password, user_nickname}
 ********************/
exports.register = (user_data, done)=> {
  new Promise((resolve, reject) => {
      const sql = "SELECT user_id FROM vvn_user WHERE user_id = ?";

      pool.query(sql, [user_data.user_id], (err, rows) => {  // 아이디 중복 체크
        if(err){
          reject(err);
        }else{
          if(rows.length != 0){  // 이미 아이디 존재
            reject(1401);
          }else{
            resolve(null);
          }
        }
      });
    }
  ).then(() => {
      return new Promise((resolve, reject) => {
        const sql = "INSERT INTO vvn_user SET ?";

        pool.query(sql, user_data, (err, rows) => {  // 가입 시도
          if(err){
            reject(err);
          }else{
            if(rows.affectedRows == 1){
              resolve(null);
            }else{
              const _err = new Error("User Register Custom error");
              reject(_err);
            }
          }
        });
      });
    }
  ).then(() => {
      done(null);
    }
  ).catch((err) => {
    done(err);
  });
};

/*******************
 *  Login
 *  @param: user_data = {user_id, user_password}
 ********************/
exports.login = (user_data, done) => {
  new Promise((resolve, reject) => {
      const sql = "SELECT user_id FROM vvn_user WHERE user_id = ?";

      pool.query(sql, [user_data.user_id], (err, rows) => {  // 아이디 존재 검사
        if(err){
          reject(err);
        }else{
          if(rows.length == 0){  // 아이디 없음
            reject(1402);
          }else{
            resolve(null);
          }
        }
      });
    }
  ).then(() => {
      return new Promise((resolve, reject) => {
        const sql =
          "SELECT user_id, user_nickname " +
          "FROM vvn_user " +
          "WHERE user_id = ? and user_password = ?";
        pool.query(sql, [user_data.user_id, user_data.user_password], (err, rows) => {
          if(err){
            reject(err);
          }else{
            if(rows.length == 0){  // 비밀번호 틀림
              reject(1403);
            }else{
              const profile = {'id': rows[0].user_id, 'nickname': rows[0].user_nickname};
              const token = jwt.sign(profile, my.jwt_config(), {'expiresIn': "10h"});
              resolve(token);
            }
          }
        });
      });
    }
  ).then((token) => {
      done(null, token);
    }
  ).catch((err) => {
    done(err);
  });
};

/*******************
 *  Authenticate
 *  @param: token
 ********************/
exports.auth = (token, done) => {
  jwt.verify(token, my.jwt_config(), (err, decoded) => {
    if(err){
      done(err);
    }else{
      const sql = "SELECT user_idx FROM vvn_user WHERE user_id = ?";
      pool.query(sql, [decoded.id], (err, rows) => {
        if(err){
          done(err);
        }else{
          if(rows.length == 0){
            done(401);
          }else{  // 인증 성공
            done(null, rows[0].user_idx);
          }
        }
      })
    }
  });
};
/**
 * Created by kingw on 2016-04-16.
 */
'use strict';

const groupModel = require('../models/groupModel');
const async = require('async');

/*******************
 *  Group Create
 ********************/
exports.groupCreate = (req, res, next) => {
  if(!req.body.title || !req.body.category) {
    next(9401);
  }else{
    const group_data = {
      group_title: req.body.title,
      user_idx: req.user_idx,
      cate_idx: req.body.category
    };

    groupModel.groupCreate(group_data, (err) => {
      if(err){
        next(err);
      }else{
        return res.json({});
      }
    });
  }
};


/*******************
 *  My Group List
 ********************/
exports.myGroupList = (req, res, next) => {
  groupModel.myGroupList(req.user_idx, (err, group_list) => {
    if(err){
      next(err);
    }else{
      return res.json({
        "group_list": group_list
      });
    }
  });
};
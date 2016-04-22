/**
 * Created by kingw on 2016-04-16.
 */
'use strict';

const groupModel = require('../models/groupModel');
const async = require('async');

/*******************
 *  Group Create
 *  @err_code: 1=파라미터, 10=DB에러
 ********************/
exports.groupCreate = (req, res, next) => {
  if(!req.body.title || !req.body.category) {
    next(1);  // err_code = 1
  }else{
    const group_data = {
      group_title: req.body.title,
      user_idx: req.user_idx,
      cate_idx: req.body.category
    };

    groupModel.groupCreate(group_data, (status, _err) => {
      return res.json({
        "status": status,
        "error": _err
      });
    });
  }
};


/*******************
 *  My Group List
 *  @err_code: 10=DB에러
 ********************/
exports.myGroupList = (req, res) => {
  groupModel.myGroupList(req.user_idx, (status, group_list, _err) => {
    return res.json({
      "status": status,
      "group_list": group_list,
      "error": _err
    });
  });
};
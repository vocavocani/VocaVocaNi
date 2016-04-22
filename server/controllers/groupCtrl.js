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
      title: req.body.title,
      category: req.body.category,
      creator: req.user_idx
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
 *  @err_code: 1=파라미터, 10=DB에러
 ********************/
exports.myGroupList = (req, res, next) => {
  groupModel.myGroupList(req.user_idx, (status, _err) => {

  });
};
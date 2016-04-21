/**
 * Created by kingw on 2016-04-16.
 */
var groupModel = require('../models/groupModel');
var async = require('async');

/*******************
 *  Group Create
 *  @err_code: 1=파라미터, 10=DB에러
 ********************/
exports.groupCreate = function(req, res, next){
  if(!req.body.title || !req.body.category || !req.user_idx) {
    next(1);  // err_code = 1
  }else{
    var group_data = {
      title: req.body.title,
      category: req.body.category,
      creator: req.user_idx
    };

    groupModel.groupCreate(group_data, function(status, _err){
      return res.json({
        "status": status,
        "error": _err
      });
    });
  }
};
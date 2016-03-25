/**
 * Created by kingw on 2016-03-20.
 */

/*******************
 *  Login
 ********************/

exports.login = function(req, res){
  if(req.body.id == "aa" && req.body.pw == "1234"){
    res.json({
      "status": "success"
    });
  }else{
    res.json({
      "status": "false"
    })
  }
};
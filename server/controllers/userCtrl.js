/**
 * Created by kingw on 2016-03-20.
 */

/*******************
 *  Login
 ********************/

exports.login = function(req, res){
  console.log(req.body);
  if(req.body.id == "aa" && req.body.pw == "1234"){
    res.json({
      "status": 1,
      "username": req.body.id
    });
  }else{
    res.json({
      "status": 0
    })
  }
};
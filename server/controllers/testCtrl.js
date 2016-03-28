/**
 * Created by kingw on 2016-02-10.
 */

/*******************
 *  TEST
 ********************/
exports.data = function(req, res){
  res.json({
    "data":
      [
        {author: "Pete Hunt", text: "댓글입니다"},
        {author: "Jordan Walke", text: "*또 다른* 댓글입니다"},
        {author: "LEE", text: "perfect man"}
      ]
  });
};
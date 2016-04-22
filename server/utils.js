/**
 * Created by kingw on 2016-04-21.
 */

/*************
 * Create DB Error Object
 *************/
exports.dbError = (message, error) => {
  console.log(message + " ===> " + error);

  return {
    "code": 10,
    "message": message
  }
};
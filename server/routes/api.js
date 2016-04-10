/**
 * Created by kingw on 2016-02-10.
 */
var testCtrl = require('../controllers/testCtrl');
var userCtrl = require('../controllers/userCtrl');

exports.initApp = function(app){
    // TEST
    app.route('/api/data')
      .get(testCtrl.data);

    // User
    app.route('/api/user/login')
      .post(userCtrl.login);
    app.route('/api/user/register')
      .post(userCtrl.register);
    app.route('/api/auth')
      .get(userCtrl.auth);
};
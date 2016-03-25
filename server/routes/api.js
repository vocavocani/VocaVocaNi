/**
 * Created by kingw on 2016-02-10.
 */
var testCtrl = require('../controllers/testCtrl');
var userCtrl = require('../controllers/userCtrl');

exports.initApp = function(app){
    // TEST
    app.route('/')
      .get(testCtrl.test);
    app.route('/data')
      .get(testCtrl.data);

    // RESTful data api
    app.route('/api/login')
      .post(userCtrl.login);
};
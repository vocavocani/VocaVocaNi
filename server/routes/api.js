/**
 * Created by kingw on 2016-02-10.
 */
var testCtrl = require('../controllers/testCtrl');
var userCtrl = require('../controllers/userCtrl');

exports.initApp = function(app){
    // TEST
    app.route('/api/data')
      .get(testCtrl.data);

    /************
     * REST data api
     ************/
        // User
    app.route('/api/login')
      .post(userCtrl.login);
    app.route('/api/register')
      .post(userCtrl.register);
};
/**
 * Created by kingw on 2016-02-10.
 */
'use strict';

const testCtrl = require('../controllers/testCtrl');
const userCtrl = require('../controllers/userCtrl');
const groupCtrl = require('../controllers/groupCtrl');

exports.initApp = (app) => {
    // TEST
    app.route('/api/data')
      .get(testCtrl.data);

    // User
    app.route('/api/user/login')
      .post(userCtrl.login);
    app.route('/api/user/register')
      .post(userCtrl.register);

    // Group
    app.route('/api/group')
      .get(userCtrl.auth, groupCtrl.myGroupList)
      .post(userCtrl.auth, groupCtrl.groupCreate);
};
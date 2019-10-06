const router = require('express').Router();
const controller = require('./controllers/controller')

router.post('/lti', controller.verifyLtiLaunch)

router.get('/', controller.homeController)


module.exports = router;

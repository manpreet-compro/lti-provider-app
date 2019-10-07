const oauth = require('oauth-sign');
const config = require('../config');

exports.homeController = (req, res)=>{
    res.render('status.hbs',{
        title: "LTI Tool Provider App"
    })
}

exports.verifyLtiLaunch = (req,res)=>{
    if (req.body.lti_message_type != "basic-lti-launch-request" || req.body.oauth_signature_method != "HMAC-SHA1" || req.body.lti_version != "LTI-1p0" || req.body.oauth_version != "1.0") {
        res.render('error.hbs', {
            badRequest: true,
            validated: false
        });
    }
    let action = config.TPUrl;
    let secret = config.tool_secret;
    let oauth_signature_received = req.body.oauth_signature;
    delete req.body.oauth_signature;
    oauth_signature = oauth.hmacsign('POST', action, req.body, secret);
    if (oauth_signature == oauth_signature_received) {
        res.render('lti.hbs',{
            ltiparams: req.body
        });
    }
    else {
        res.render('error.hbs', {
            badRequest: false,
            validated: true
        });
    }
}
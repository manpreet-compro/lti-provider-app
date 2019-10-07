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
            badRequest: true
        });
    }

    if (config.consumer_keys[req.body.oauth_consumer_key]) {
        res.render('error.hbs', {
            keyNotFound: true
        });
    }

    let action = config.TPUrl;
    let secret = config.consumer_keys[req.body.oauth_consumer_key];

    let consumer_signature = req.body.oauth_signature;
    delete req.body.oauth_signature;

    provider_signature = oauth.hmacsign('POST', action, req.body, secret);

    if (provider_signature == consumer_signature) {
        res.render('lti.hbs',{
            ltiparams: req.body
        });
    }
    else {
        res.render('error.hbs', {
            validated: true
        });
    }
}
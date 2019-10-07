const oauth = require('oauth-sign');
const config = require('../config');

exports.homeController = (req, res)=>{
    res.render('status.hbs',{
        title: "LTI Tool Provider App"
    })
}

exports.verifyLtiLaunch = (req,res)=>{
    // delete req.body.tool_provider_url;
    // delete req.body.tool_secret;
    let action = req.body.tool_provider_url;
    let secret = config.tool_secret;
    // delete req.body.tool_provider_url;
    // delete req.body.tool_secret;
    var oauth_signature_received = req.body.oauth_signature;
    delete req.body.oauth_signature;
    oauth_signature = oauth.hmacsign('POST', action, req.body, secret);
    if (oauth_signature == oauth_signature_received) {
        res.render('lti.hbs');
    }
    else {
        res.render('error.hbs', {
            signature: oauth_signature,
            receivedSignature: oauth_signature_received
        });
    }
}
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
    
    oauth_signature = oauth.hmacsign('POST', action, req.body, secret);
    if (oauth_signature == req.body.oauth_signature) {
        res.render('lti.hbs');
    }
    else {
        res.render('error.hbs', {
            signature: oauth_signature
        });
    }
}
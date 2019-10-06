const oauth = require('oauth-sign');
const config = require('../config');

exports.homeController = (req, res)=>{
    res.render('status.hbs',{
        title: "LTI Tool Provider App"
    })
}

exports.verifyLtiLaunch = (req,res)=>{
    // console.log(req.body.oauth_consumer_key);
    // console.log(req.body.param1);

    // let formFields = Object.assign({},req.query);

    // //remove additional fields
    delete req.body.tool_provider_url;
    delete req.body.tool_secret;

    // //add computed fields
    // formFields.oauth_timestamp = Math.round(Date.now() / 1000);
    // formFields.oauth_nonce = nonce();

    // let method = "POST";
    let action = req.body.tool_provider_url;
    // let params = {
    //     oauth_consumer_key = req.body.oauth_consumer_key,
    // }
    let secret = config.tool_secret;
    
    oauth_signature = oauth.hmacsign('POST', action, req.body, secret);
    if (oauth_signature == req.body.oauth_signature) {
        res.render('lti.hbs');
    }
    else {
        res.render('error.hbs');
    }


    // res.send("success");
}
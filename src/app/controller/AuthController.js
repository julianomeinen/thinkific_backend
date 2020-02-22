const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

class AuthController {

  async authenticate(req, res) {
    const { email, password} = req.body;

    if(!email)
        return res.status(400).send( { error: 'Empty email' });
    
    if(!password)
        return res.status(400).send( { error: 'Empty password' });

    
    // Simple validation for test
    if(email != "juliano@thinkific.com"){
        return res.status(400).send( { error: "Invalid email (Tip: must be 'juliano@thinkific.com')" });
    }
    if(password != "thinkific"){
        return res.status(400).send( { error: "Invalid password (Tip: must be 'thinkific')" });
    }
    
    const token = jwt.sign( { id: email }, authConfig.secret , { expiresIn: 3600 }); // 1 hour valid token
    return res.json({ email, token } );
        
  }

  async googleAuthenticate(req, res) {
    const email = req.user.id;
    const token = this.createToken(email);
    return res.json({ email, token } );

  }

  createToken(id){
      return jwt.sign( { id: id }, authConfig.secret , { expiresIn: 3600 }); // 1 hour valid token
  }

}

module.exports = new AuthController();
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

class AuthController {
  
  async authenticate(req, res) {
    const { email, password} = req.query;

    if(!email)
        return res.status(400).send( { error: 'Empty email' });
    
    if(!password)
        return res.status(400).send( { error: 'Empty password' });

    let isValid = true;

    // TODO - SSO Google and Facebook
    if(!isValid){
        return res.status(400).send( { error: 'Invalid email or password'  });
    }

    const token = jwt.sign( { id: email }, authConfig.secret , { expiresIn: 86400 });

    return res.json({ email, token } );

  }

}

module.exports = new AuthController();
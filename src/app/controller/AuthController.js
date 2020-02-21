const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

class AuthController {
  
  async authenticate(req, res) {
    const { email, password} = req.body;

    if(!email)
        return res.status(400).send( { error: 'Empty email' });
    
    if(!password)
        return res.status(400).send( { error: 'Empty password' });

    let isValid = true;

    // TODO - SSO Google and Facebook
    if(!isValid){
        return res.status(400).send( { error: 'Invalid email or password'  });
    }

    const token = jwt.sign( { id: email }, authConfig.secret , { expiresIn: 3600 }); // 1 hour valid token

    return res.json({ email, token } );

  }

}

module.exports = new AuthController();
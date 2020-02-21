const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, rest, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return rest.status(401).send( { error: 'No token provided'} );
    
    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return rest.status(401).send( { error: 'Token structure error'} );

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return rest.status(401).send( { error: 'Token malformatted'} );

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err)
            return rest.status(401).send( { error: 'Token invalid'} ); 

        req.email = decoded.email;
        return next();
    });
};
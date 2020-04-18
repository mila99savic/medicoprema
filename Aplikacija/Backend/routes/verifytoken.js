const jwt = require('jsonwebtoken');

//fja bi trebalo da se doda svim rutama(routes) koje su protected!
// Protected Routes - HOME

//dodaje se: const verify = req..
//router.get('/', verify, (req, res))
function verification (req, res, next)  {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, 'tokencic');
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

module.exports = verification;
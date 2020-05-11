const jwt = require('jsonwebtoken');

//fja bi trebalo da se doda svim rutama(routes) koje su protected!
// Protected Routes - HOME

//dodaje se: const verify = req..
//router.get('/', verify, (req, res))
function verification (req, res, next)  {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Pristup odbijen');

    try{
        const verified = jwt.verify(token, 'ovojetajna');
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Nevazeci Token');
    }
}

module.exports = verification;
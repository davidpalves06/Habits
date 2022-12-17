const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) => {
    const authHeader = req.headers['authorization']
    let token = ""
    if (authHeader) {
        token = authHeader.split(' ')[1]
    }
    else token = null;

    if (!token) {
        res.status(401).json({message:"Token não atribuido!"});
        return
    }
    
    try {
        const decoded = jwt.verify(token,process.env.TOKEN_KEY)
        req.user = decoded;
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({message:"Erro no servidor! Tente mais tarde!"});
    }

    return next()
}

module.exports = verifyToken
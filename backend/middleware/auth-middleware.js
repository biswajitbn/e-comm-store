const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).send({ error: "access denied" });
  }

  // ✅ Extract token properly if it starts with 'Bearer '
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : authHeader;

  try {
    const decode = jwt.verify(token, "secret"); // replace "secret" with your actual JWT secret
    req.user = decode;
    next();
  } catch (err) {
    return res.status(400).send({ error: "invalid token" });
  }
}


function isAdmin(req,res,next){
    if(req.user && req.user.isAdmin){
        next();
    }else{
        return res.status(403).send({
            error: "forbidden",
        });
    }
}

module.exports = {verifyToken,isAdmin};
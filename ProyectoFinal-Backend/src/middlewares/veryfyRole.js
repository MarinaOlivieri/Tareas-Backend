const IS_ADMIN = true

const verifyRole = (req, res, next)=>{
    if(!IS_ADMIN) return res.send({err:
        "Usuario no autorizado"})
        next()
}

export {verifyRole}
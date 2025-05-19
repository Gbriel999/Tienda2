import { jwtVerify } from "../../util/auth/jwt.js";

export const authToken = (req, res, next) => {
    const authorization = req.header('Authorization')
    if (authorization === undefined) {
        return res.status(401).json({ status: false, code: 401, message: 'Ingresa un Token' })
    }
    const [bearer, token] = authorization.split(' ')
    if (bearer !== 'Bearer') {
        return res.status(401).json({ status: false, code: 401, message: 'Token Invalido' })
    }
    try {
        jwtVerify(token) && next()
    } catch (error) {
        res.status(401).json({ status: false, code: 401, message: 'Token Invalido' })
    }
}

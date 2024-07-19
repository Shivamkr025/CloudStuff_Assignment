import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const createToken = (email) => {
    return jwt.sign({ email }, process.env.secretKey, { expiresIn: '1h' })
}

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." })
    }

    try {
        const decodeToken = jwt.verify(token, process.env.secretKey)
        req.user = decodeToken
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong in verify token function" })
    }
}

export { createToken, verifyToken }
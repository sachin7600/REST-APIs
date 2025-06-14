const jwt = require('jsonwebtoken');

exports.isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json({
                success: false,
                msg: "User is unauthorized"
            })
        }

        const decode = jwt.verify(token, process.env.SECRET);

        if (!decode) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }

        req.id = decode.userId;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}
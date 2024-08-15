const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const [bearer, actualToken] = token.split(' ');

        if (bearer === 'Bearer' && actualToken) {
            const decoded = jwt.verify(actualToken, SECRET);

            req.user = decoded;

            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized: Malformed token' });
        }
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        } else {
            console.error(err);
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    }
};

module.exports = authenticateUser;

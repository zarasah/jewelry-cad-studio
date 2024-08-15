const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;
const expiresIn  = process.env.JWT_EXPIRATION_MINUTES;

function generateAccessToken(id, email) {
    const payload = {
        id,
        email
    };
    return jwt.sign(payload, SECRET, { expiresIn });
}

module.exports = generateAccessToken;
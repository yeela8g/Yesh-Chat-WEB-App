const { createTokenService } = require('../services/Tokens.js');

const createToken = async (req, res) => {
    const result = await createTokenService(req.body);
    if (result.status !== 200) {
        res.status(404).send(result.body);
    }
    else {
        res.status(200).send(result.body);
    }
}

module.exports = { createToken };
const bcrypt = require('bcryptjs');

function hashValue(plainValue) {
    return bcrypt.hashSync(plainValue, 10);
}

function verifyHash(userInput, dbResult) {
    return bcrypt.compareSync(userInput.password, dbResult[0].password)
}

module.exports = {
    hashValue,
    verifyHash,
};

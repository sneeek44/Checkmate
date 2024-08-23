const bcrypt = require('bcrypt')

const saltRounds = 10

function compare(value, hashedValue) {
    return bcrypt.compareSync(value, hashedValue)
}

function hashValue(value) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(value, salt)
}

module.exports = {
    compare,
    hashValue
}

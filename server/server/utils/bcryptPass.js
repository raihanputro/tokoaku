const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const hashPass = (password) => {
    return bcrypt.hashSync(password, salt);
}

const comparePass = (password, passwordDb) => {
    return bcrypt.compareSync(password, passwordDb);
}

module.exports = { hashPass, comparePass }
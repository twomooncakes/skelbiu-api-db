const { hashValue, verifyHash } = require('../utils/hashHelper');

const register = async (req, res) => {
    const newUser = {
        email: req.body.email,
        password: hashValue(req.body.password),
        city: req.body.city,
        phone: req.body.phone
    }
    // !! needs db action
    console.log(newUser);
    res.send({msg: 'Registration successful!'})
}

const login = async (req, res) => {

}

module.exports = {
    register, login
};
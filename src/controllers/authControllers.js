const { hashValue, verifyHash } = require('../utils/hashHelper');
const {dbAction, dbFail, dbSuccess} = require('../utils/dbHelper');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const newUser = {
        email: req.body.email,
        password: hashValue(req.body.password),
        city: req.body.city || null,
        phone: req.body.phone || null
    }
    // check if user exists
    let sql = `
        SELECT * FROM users
        WHERE email = (?)
    `;
    const userExists = await dbAction(sql, [newUser.email]);
    console.log(userExists);
    if(userExists.length !== 0) {
        return dbFail(res, 'Email is already in use!', 400)
    }

    // add new user
    sql = `
        INSERT INTO users(email, password, city, phone)
        VALUES(?, ?, ?, ?)
    `;
    const dbResult = await dbAction(sql, Object.values(newUser));
    if(dbResult) {
        return dbSuccess(res, dbResult, 'Registration successful!')
    } 
    dbFail(res, 'Registration failed');
}

const login = async (req, res) => {
    const userData = req.body;
    const sql = `
        SELECT * FROM users
        WHERE email = (?)
    `;
    const dbResult = await dbAction(sql, [userData.email]);
    if(dbResult.length === 0) {
        return dbFail(res, 'Incorrect email or password', 400)
    }
    console.log(dbResult);
    if(verifyHash(userData, dbResult)) {
        const token = jwt.sign(
            {id: dbResult[0].id, email: dbResult[0].email}, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' },
        );
        return dbSuccess(res, { token, email: dbResult[0].email }, 'Successfully logged in!');
    }
    dbFail(res, 'Incorrect email or password', 400);
}

module.exports = {
    register, login
};
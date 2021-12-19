const { dbAction, dbFail, dbSuccess } = require("../utils/dbHelper");
const { verifyHash, hashValue } = require("../utils/hashHelper");

const getUserInfo = async (req, res) => {
    const sql = `
        SELECT users.email, users.city, users.phone, users.timestamp, 
        COUNT(DISTINCT(listings.id)) AS numOfAds, 
        COUNT(DISTINCT(favorites.listing_id)) AS numOfFaves 
        FROM users 
        LEFT JOIN listings 
        ON listings.user_id = users.id 
        LEFT JOIN favorites 
        ON favorites.user_id = users.id 
        WHERE users.id = ?;
    `;
    const dbResult = await dbAction(sql, [req.id]);
    if(dbResult) {
        return dbSuccess(res, dbResult, 'user info fetched');
    }
    dbFail(res, 'unexpected error', 500);
}

const editUserInfo = async (req, res) => {
    const newInfo = {
        city: req.body.city || null,
        phone: req.body.phone || null,
        id: req.id
    }
    let sql = `
        UPDATE users
        SET 
            city = ?,
            phone = ?
        WHERE id = ?
    `;
    const dbResult = await dbAction(sql, Object.values(newInfo));
    if(dbResult) {
        return dbSuccess(res, {}, 'user info edited');
    }
    dbFail(res, 'unexpected error', 500);
}

const editUserEmail = async (req, res) => {
    const userData = req.body;
    // check if email exists first
    let sql = `
        SELECT * FROM users
        WHERE id = (?)
    `;
    let dbResult = await dbAction(sql, [req.id]);
    if(!dbResult) {
        return dbFail(res, 'unexpected Error', 500)
    }

    if(!verifyHash(userData, dbResult)) {
        return dbFail(res, 'password is incorrect', 400)
    }

    sql = `
        UPDATE users
        SET email = ?
        WHERE id = ?
    `;

    dbResult = await dbAction(sql, [req.body.email, req.id]);
    if(dbResult) {
        return dbSuccess(res, {}, 'user password changed')
    } else {
        return dbFail(res, 'unexpected error', 500)
    }
}

const editUserPassword = async (req, res) => {
    const oldPasswordData = { password: req.body.oldPassword };
    let sql = `
        SELECT * FROM users
        WHERE id = (?)
    `;
    let dbResult = await dbAction(sql, [req.id]);
    if(!verifyHash(oldPasswordData, dbResult)) {
        return dbFail(res, 'incorrect password', 400);
    }

    const newPasswordValue = hashValue(req.body.newPassword);
    sql = `
        UPDATE users
        SET password = ?
        WHERE id = ?
    `;
    
    dbResult = await dbAction(sql, [ newPasswordValue, req.id]);
    if(dbResult) {
        return dbSuccess(res, {}, 'password changed successfully');
    }
    dbFail(res, 'unexpected error', 500);
    
}

const deleteUser = async (req, res) => {
    const sql = `
        DELETE FROM users
        WHERE id = ?;
    `;
    const dbResult = await dbAction(sql, [req.id]);
    if(dbResult) {
        return dbSuccess(res, {}, 'user deleted successfully');
    }
    dbFail(res, 'unexpected error', 500);
}

module.exports = {
    getUserInfo, editUserInfo, editUserEmail, editUserPassword, deleteUser
};
const { dbAction, dbFail, dbSuccess } = require("../utils/dbHelper");
const { verifyHash } = require("../utils/hashHelper");

const getUserInfo = async (req, res) => {
    console.log(req.id);
    let sql = `
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
    res.send({msg: 'user info fetched', data: dbResult});
}

const editUserInfo = async (req, res) => {
    console.log(req.id);
    console.log('body below');
    console.log(req.body);
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
    res.send({msg: 'user info edited'});
}

const editUserEmail = async (req, res) => {
    console.log(req.id);
    console.log('body below');
    console.log(req.body);
    const userData = req.body;
    let sql = `
        SELECT * FROM users
        WHERE id = (?)
    `;
    let dbResult = await dbAction(sql, [req.id]);
    if(!dbResult) {
        return dbFail(res, 'Unexpected Error', 500)
    }

    if(!verifyHash(userData, dbResult)) {
        return dbFail(res, 'Password is incorrect', 400)
    }

    sql = `
        UPDATE users
        SET email = ?
        WHERE id = ?
    `;
    dbResult = await dbAction(sql, [req.body.email, req.id]);
    if(dbResult) {
        return dbSuccess(res, {}, 'User email edited')
    } else {
        return dbFail(res, 'Unexpected Error', 500)
    }
}

module.exports = {
    getUserInfo, editUserInfo, editUserEmail
};
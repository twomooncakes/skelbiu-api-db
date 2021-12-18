const { dbAction } = require("../utils/dbHelper");

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

module.exports = {
    getUserInfo, editUserInfo
};
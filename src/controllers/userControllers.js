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
    // let sql = `
    //     SELECT * FROM users
    //     WHERE id = ?
    // `;
    // const dbResult = await dbAction(sql, [req.id]);
    res.send({msg: 'user info edited'});
}

module.exports = {
    getUserInfo, editUserInfo
};
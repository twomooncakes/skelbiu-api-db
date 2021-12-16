const { dbAction } = require("../utils/dbHelper");

const getUserInfo = async (req, res) => {
    console.log(req.id);
    let sql = `
        SELECT * FROM users
        WHERE id = ?
    `;
    const dbResult = await dbAction(sql, [req.id]);
    res.send({msg: 'user info fetched', data: dbResult});
}

module.exports = {
    getUserInfo
};
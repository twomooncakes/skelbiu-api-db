const { dbAction, dbFail, dbSuccess } = require("../utils/dbHelper");

const getCategories = async (req, res) => {
    const sql = `
        SELECT * FROM categories;
    `;
    const dbResult = await dbAction(sql, []);
    if(dbResult) {
        return dbSuccess(res, dbResult, 'categories fetched');
    }
    dbFail(res, 'unexpected error', 500);
}

module.exports = {
    getCategories
};
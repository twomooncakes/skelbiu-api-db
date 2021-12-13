const mysql = require('mysql2/promise');
const { dbConfig } = require('../DBconfig');

async function dbAction(sql, dbData = []) {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [dbResult] = await conn.execute(sql, dbData);
        await conn.end();
        return dbResult;
    } catch (error) {
        console.error('dbAction error ', error.message);
        return false;
    }
}

function dbSuccess(res, data, msg = 'success', code = 200) {
    res.status(code).json({ msg, data });
}

function dbFail(res, errorText = 'Something went wrong', code = 500) {
    res.status(code).json({ error: errorText });
}

module.exports = {
    dbAction,
    dbSuccess,
    dbFail,
};
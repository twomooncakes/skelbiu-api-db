const { dbAction, dbFail, dbSuccess } = require("../utils/dbHelper");

const addListing = async (req, res) => {
    let img = 'placeholder-photo.png';
    if(req.file) {
        img = req.file.filename;
    }
    const newListing = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: img,
        cat_id: req.body.categoryId,
        userId: req.id
    }
    console.log(Object.values(newListing));
    const sql = `
        INSERT INTO listings(title, description, price, image, cat_id, user_id) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const dbResult = await dbAction(sql, Object.values(newListing));
    if(dbResult) {
        return dbSuccess(res, {}, 'listing created')
    }
    dbFail(res, 'unexpected error', 500);
}

const favoriteListing = async (req, res) => {
    const sql = `
        INSERT INTO favorites(user_id, listing_id) VALUES (?, ?)
    `;
    const dbResult = await dbAction(sql, [req.id , req.params.listingId]);
    if(dbResult) {
        return dbSuccess(res, {}, 'listing favorited')
    }
    dbFail(res, 'unexpected error', 500);
}

const unfavoriteListing = async (req, res) => {
    const sql = `
        DELETE FROM favorites 
        WHERE user_id = (?) AND listing_id = (?)
    `;
    const dbResult = await dbAction(sql, [req.id , req.params.listingId]);
    if(dbResult) {
        return dbSuccess(res, {}, 'listing unfavorited')
    }
    dbFail(res, 'unexpected error', 500);
}

const getListings = async (req, res) => {
    let sql = `
        SELECT listings.*,
        categories.category_name, 
        users.email AS seller,
        users.city
        FROM listings
        LEFT JOIN users
        ON users.id = listings.user_id
        LEFT JOIN categories
        ON categories.id = listings.cat_id
        WHERE listings.archived = 0;
    `;
    if(req.id) {
        sql = `
            SELECT listings.*,
            users2.email AS seller,
            users2.city,
            categories.category_name, 
            GROUP_CONCAT(users.email) AS likedBy 
            FROM listings 
            LEFT JOIN favorites 
            ON favorites.listing_id = listings.id 
            LEFT JOIN users 
            ON users.id = favorites.user_id 
            LEFT JOIN categories
            ON categories.id = listings.cat_id
            LEFT JOIN users AS users2 
            ON users2.id = listings.user_id
            WHERE listings.archived = 0
            GROUP BY listings.id; 
        `;
    }

    const dbResult = await dbAction(sql, [req.id || null]);
    if(dbResult) {
        return dbSuccess(res, dbResult, 'listings fetched')
    }
    dbFail(res, 'unexpected error', 500);
}

const getUserListings = async (req, res) => {
    const sql = `
        SELECT listings.*,
        users.email AS seller,
        users.city,
        categories.category_name
        FROM listings 
        LEFT JOIN categories
        ON categories.id = listings.cat_id
        LEFT JOIN users
        ON users.id = listings.user_id
        WHERE listings.user_id = (?) AND listings.archived = 0;
    `;

    const dbResult = await dbAction(sql, [req.id]);
    if(dbResult) {
        return dbSuccess(res, dbResult, 'user listings fetched')
    }
    dbFail(res, 'unexpected error', 500);
}

const getSingleListing = async (req, res) => {
    let sql = `
        SELECT listings.archived
        FROM listings
        WHERE listings.id = (?)
    `;
    const listingArchived = await dbAction(sql, [req.params.listingId]);

    if(listingArchived[0].archived === 1) {
        return dbFail(res, "Listing is unavailable", 400);
    }

    sql = `
        SELECT listings.*,
        users.*,
        categories.category_name,
        GROUP_CONCAT(users2.email) AS likedBy
        FROM listings
        LEFT JOIN users
        ON users.id = listings.user_id
        LEFT JOIN categories
        ON categories.id = listings.cat_id
        LEFT JOIN favorites
        ON favorites.listing_id = listings.id 
        LEFT JOIN users AS users2 
        ON users2.id = favorites.user_id 
        WHERE listings.id = (?) AND listings.archived = 0;
    `;
    const dbResult = await dbAction(sql, [req.params.listingId]);
    if(dbResult) {
        return dbSuccess(res, dbResult, 'listing fetched');
    }
    dbFail(res, 'unexpected error', 500);
}

const editListing = async (req, res) => {
    const editedListing = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.body.mainImage || req.file.filename,
        cat_id: req.body.categoryId,
        id: req.params.listingId
    }
    const sql = `
        UPDATE listings
        SET
            title = ?,
            description = ?,
            price = ?, 
            image = ?,
            cat_id = ?
        WHERE id = (?)
    `;
    const dbResult = await dbAction(sql, Object.values(editedListing));
    if(dbResult) {
        return dbSuccess(res, {}, 'listing edited');
    }
    dbFail(res, "unexpected error", 500);
}

const deleteListing = async (req, res) => {
    const sql = `
        UPDATE listings
        SET archived = 1
        WHERE id = (?)
    `;
    const dbResult = await dbAction(sql, [req.params.listingId]);
    if(dbResult) {
        return dbSuccess(res, {}, 'listing deleted');
    }
    dbFail(res, "unexpected error", 500);
}


module.exports = {
    addListing, favoriteListing, unfavoriteListing, getListings, getUserListings, getSingleListing, editListing, deleteListing
};
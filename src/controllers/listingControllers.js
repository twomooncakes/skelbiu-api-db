const { dbAction } = require("../utils/dbHelper");

const addListing = async (req, res) => {
    console.log('req.body ===', req.body);
    console.log(req.file.filename);
    
    const newListing = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.file.filename,
        userId: req.id
    }
    // if (req.file.size >= 500000) {
    //   res.status(400).json({ error: 'Too big' });
    // }
    console.log(Object.values(newListing));
    const sql = `
        INSERT INTO listings(title, description, price, image, user_id) 
        VALUES (?, ?, ?, ?, ?)
    `;
    const dbResult = await dbAction(sql, Object.values(newListing));

    res.send({ msg: 'image saved', dbResult});
}

const favoriteListing = async (req, res) => {
    console.log(req.headers.authorization);
    console.log(req.params.listingId);
    console.log('req.body ===' , req.body);
    let sql = `
        INSERT INTO favorites(user_id, listing_id) VALUES (?, ?)
    `;
    const dbResult = await dbAction(sql, [req.id , req.params.listingId]);
    res.send({msg: 'listing favorited', data: dbResult});
}

const unfavoriteListing = async (req, res) => {
    console.log(req.headers.authorization);
    console.log(req.params.listingId);
    console.log('req.body ===' , req.body);
    let sql = `
        DELETE FROM favorites 
        WHERE user_id = (?) AND listing_id = (?)
    `;
    const dbResult = await dbAction(sql, [req.id , req.params.listingId]);
    res.send({msg: 'listing unfavorited', data: dbResult});
}

const getListings = async (req, res) => {
    console.log(req.headers.authorization);
    console.log(req.id);
    let sql = `
        SELECT * FROM listings
    `;
    if(req.headers.authorization) {
        sql = `
            SELECT listings.*,
            users2.email AS seller,
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
            GROUP BY listings.id; 
        `;
    }
    const dbResult = await dbAction(sql, [req.id || null]);
    res.send({msg: 'listings fetched', data: dbResult});
}

const getUserListings = async (req, res) => {
    console.log(req.headers.authorization);
    console.log(req.id);
    let sql = `
        SELECT listings.*,
        users.email AS seller,
        categories.category_name
        FROM listings 
        LEFT JOIN categories
        ON categories.id = listings.cat_id
        LEFT JOIN users
        ON users.id = listings.user_id
        WHERE listings.user_id = (?)
    `;
    const dbResult = await dbAction(sql, [req.id]);
    res.send({msg: 'listings fetched', data: dbResult});
}


module.exports = {
    addListing, favoriteListing, unfavoriteListing, getListings, getUserListings
};
// Make database work

const spicedPG = require("spiced-pg");
const db = spicedPG(
    process.env.DATABASE_URL ||
        "postgres:clear:lori@localhost:5432/socialnetwork"
);

// Add users into database

exports.addUser = (firstname, lastname, email, password) => {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password_hash)
                        VALUES ($1,$2,$3,$4) RETURNING id, firstname, lastname`,
        [firstname, lastname, email, password]
    );
};

// Make database work

const spicedPG = require("spiced-pg");
const db = spicedPG(
    process.env.DATABASE_URL ||
        "postgres:clear:lori@localhost:5432/socialnetwork"
);

// Add users into database

exports.addUser = (firstname, lastname, email, password_hash) => {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password_hash)
                        VALUES ($1,$2,$3,$4) RETURNING id, firstname, lastname`,
        [firstname, lastname, email, password_hash]
    );
};

// See if user exists in database

exports.getUserByEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
};

// Add secret pw reset code to database

exports.addResetCode = (email, secretcode) => {
    return db.query(
        `INSERT INTO codes (email, secretcode)
		VALUES ($1,$2)`,
        [email, secretcode]
    );
};

// Get secret pw reset code from the database

exports.getResetCode = (email) => {
    return db.query(
        `SELECT secretcode FROM codes WHERE email=$1 AND
         CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
        ORDER BY created_at DESC LIMIT 1;`,
        [email]
    );
};

// Update the database with new password

exports.updatePassword = (email, password_hash) => {
    return db.query(`UPDATE users SET password_hash = $2 WHERE email = $1;`, [
        email,
        password_hash,
    ]);
};

// Get user by id

exports.getUserById = (id) => {
    return db.query("SELECT * FROM users WHERE id = $1;", [id]);
};

// Update picture url to update profile pic

exports.updatePhoto = (id, profile_pic_url) => {
    return db.query(
        "UPDATE users SET profile_pic_url = $2 WHERE id = $1 RETURNING *;",
        [id, profile_pic_url]
    );
};

// Update bio

exports.updateBio = (email, bio) => {
    return db.query(`UPDATE users SET bio = $2 WHERE email = $1 RETURNING *`, [
        email,
        bio,
    ]);
};

// Find other users

exports.getMatchingUsers = (query) => {
    return db.query(
        `SELECT * FROM users WHERE firstname ILIKE $1 OR lastname ILIKE $1
ORDER BY created_at DESC
        ;`,
        [query + "%"]
    );
};

// Get a friend request

exports.getFriendRequest = (userId, otherId) => {
    return db.query(
        `
        SELECT *
        FROM friend_requests
        WHERE
            (from_id=$1 AND to_id=$2)
        OR
            (from_id=$2 AND to_id=$1);
    `,
        [userId, otherId]
    );
};

// Add friend request

exports.addFriendRequest = (userId, otherId) => {
    return db.query(
        `INSERT INTO friend_requests 
            (from_id, to_id, accepted) 
        VALUES 
               ($1,$2, false) 
        RETURNING 
            *
            `,
        [userId, otherId]
    );
};

// Delete friend request

exports.deleteFriendRequest = (userId, otherId) => {
    return db.query(
        "DELETE FROM friend_requests WHERE (to_id = $1 AND from_id = $2) OR (to_id = $2 AND from_id = $1);",
        [userId, otherId]
    );
};

// Set friend request accepted

exports.setFriendRequestAccepted = (userId, otherId) => {
    return db.query(
        "UPDATE friend_requests SET accepted=true WHERE to_id = $1 AND from_id = $2;",
        [userId, otherId]
    );
};

// Get friend requests for overview friendlist

exports.getFriends = (userId) => {
    return db.query(
        `
    SELECT
            users.id, firstname, lastname, profile_pic_url, accepted
        FROM friend_requests
        JOIN users
            ON (from_id=users.id AND to_id=$1          AND accepted=false)
            OR (from_id=users.id AND to_id=$1          AND accepted=true)
            OR (from_id=$1        AND to_id=users.id   AND accepted=true);
    `,
        [userID]
    );
};


DROP TABLE IF EXISTS users; 

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL UNIQUE,
    password_hash VARCHAR (300) NOT NULL,
    profile_pic_url VARCHAR (500), 
    bio VARCHAR (500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS codes;

CREATE TABLE codes (
        id SERIAL UNIQUE PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        secretcode VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     
 
DROP TABLE IF EXISTS friend_requests;

CREATE TABLE friend_requests (
    id serial unique PRIMARY KEY,
    from_id INTEGER,
    to_id INTEGER,
    accepted boolean,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO friend_requests (
    from_id, to_id, accepted 
) VALUES (24, 1, true), (38, 1, true), (55, 1, false), (66, 1, false); 
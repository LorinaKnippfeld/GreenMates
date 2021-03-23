
DROP TABLE IF EXISTS codes;
DROP TABLE IF EXISTS friend_requests;
DROP TABLE IF EXISTS chat_messages;
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


CREATE TABLE codes (
        id SERIAL UNIQUE PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        secretcode VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     
 

CREATE TABLE friend_requests (
    id SERIAL UNIQUE PRIMARY KEY,
    from_id INTEGER,
    to_id INTEGER,
    accepted BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE chat_messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL, 
    message_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

INSERT INTO chat_messages (user_id, message_text)
VALUES
(1,'I am all natural'),
(2,'What is your secret'),
(1,'I only consume eggshells and coffee grounds'),
(2,'Wow'),
(4,'Sounds great I whish I could try it');
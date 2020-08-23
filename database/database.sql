-- Database established for the proyect 
CREATE DATABASE union_ryte;
USE union_ryte;

CREATE TABLE users(
    id INT(10) NOT NULL AUTO_INCREMENT,
    username VARCHAR(15) NOT NULL,
    user_password VARCHAR(50) NOT NULL,
    firstname VARCHAR(25) NOT NULL,
    lastname VARCHAR(25),
    PRIMARY KEY (id),
    UNIQUE(username)
);

CREATE TABLE meats(
    id INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    type VARCHAR(1) NOT NULL,
    price FLOAT(15,2),
    PRIMARY KEY (id)
);

CREATE TABLE dairy_products(
    id INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    price FLOAT(15,2)  DEFAULT 0.00,
    PRIMARY KEY (id)
);

CREATE TABLE maintenance(
    id INT(10) NOT NULL AUTO_INCREMENT,
    arranged_for VARCHAR(25) NOT NULL,
    dated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    indoors BOOLEAN,
    PRIMARY KEY (id)
);
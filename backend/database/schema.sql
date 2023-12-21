-- DROP DATABASE IF EXISTS lesgeocodeurs;

-- CREATE DATABASE lesgeocodeurs;

use lesgeocodeurs;

-- create table
--     item (
--         id int unsigned primary key auto_increment not null,
--         title varchar(255) not null
--     );

-- Table 'user'
CREATE TABLE
    user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255),
        prenom VARCHAR(255),
        email VARCHAR(255),
        isAdmin BOOLEAN,
        Cp INT,
        ville VARCHAR(255),
        mdp VARCHAR(255),
        birth_day DATE
    );

-- Table 'station'
CREATE TABLE
    station (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255)
    );
-- Table 'bornes'
CREATE TABLE
    bornes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        lat DECIMAL(10, 8),
        lon DECIMAL(11, 8),
        station_id INT,
        FOREIGN KEY (station_id) REFERENCES station(id)
    );

-- Table 'type_de_prise'
CREATE TABLE
    type_de_prise (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255)
    );

-- Table 'bornes_type_de_prise' (Many-to-Many Relationship between 'bornes' and 'type_de_prise')
CREATE TABLE
    bornes_type_de_prise (
        type_de_prise_id INT,
        bornes_id INT,
        FOREIGN KEY (type_de_prise_id) REFERENCES type_de_prise(id),
        FOREIGN KEY (bornes_id) REFERENCES bornes(id),
        PRIMARY KEY (type_de_prise_id, bornes_id)
    );

-- Table 'vehicule'
CREATE TABLE
    vehicule (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        marque VARCHAR(80),
        model VARCHAR(80),
        type_de_prise_id INT,
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (type_de_prise_id) REFERENCES type_de_prise(id)
    );
-- Table 'reservation'
CREATE TABLE
    reservation (
        id INT AUTO_INCREMENT PRIMARY KEY,
        prix DECIMAL(10, 2),
        -- Assuming a decimal value for price
        date DATE,
        heure TIME,
        duree INT,
        -- Duration in minutes/hours, adjust data type as needed
        user_id INT,
        borne_id INT,
        vehicule_id INT,
        is_active BOOLEAN,
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (borne_id) REFERENCES bornes(id),
        FOREIGN KEY (vehicule_id) REFERENCES vehicule(id)
    );
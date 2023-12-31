-- Table 'user'
CREATE TABLE
    user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255),
        password VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        birth_date DATE,
        postal_code INT,
        city VARCHAR(255),
        is_admin BOOLEAN DEFAULT 0
    );

-- Table 'station'
CREATE TABLE
    station (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        address VARCHAR(255),
        latitude DECIMAL(15, 12),
        longitude DECIMAL(15, 12)
    );

-- Table 'charging_point'
CREATE TABLE
    charging_point (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        station_id INT,
        FOREIGN KEY (station_id) REFERENCES station(id)
    );

-- Table 'plug_type'
CREATE TABLE
    plug_type (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
    );

-- Table 'charging_point_plug_type' (Many-to-Many Relationship between 'charging_point' and 'plug_type')
CREATE TABLE
    charging_point_plug_type (
        id INT AUTO_INCREMENT PRIMARY KEY,
        plug_type_id INT,
        charging_point_id INT,
        FOREIGN KEY (plug_type_id) REFERENCES plug_type(id),
        FOREIGN KEY (charging_point_id) REFERENCES charging_point(id)
    );

-- Table 'vehicle'
CREATE TABLE
    vehicle (
        id INT AUTO_INCREMENT PRIMARY KEY,
        brand VARCHAR(255),
        model VARCHAR(255),
        user_id INT,
        plug_type_id INT,
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (plug_type_id) REFERENCES plug_type(id)
    );

-- Table 'reservation'
CREATE TABLE
    reservation (
        id INT AUTO_INCREMENT PRIMARY KEY,
        price DECIMAL(5, 2),
        datetime DATETIME,
        is_cancelled BOOLEAN DEFAULT 0,
        user_id INT,
        charging_point_id INT,
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (charging_point_id) REFERENCES charging_point(id)
    );
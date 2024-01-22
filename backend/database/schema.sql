-- Table "user"
CREATE TABLE
    user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        birth_date DATE,
        postal_code INT,
        city VARCHAR(255),
        is_admin BOOLEAN DEFAULT 0
    );

-- Table "station"
CREATE TABLE
    station (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        address VARCHAR(255),
        latitude DECIMAL(15, 12),
        longitude DECIMAL(15, 12)
    );

-- Table "charging_point"
CREATE TABLE
    charging_point (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        power INT,
        station_id INT,
        FOREIGN KEY (station_id) REFERENCES station(id)
    );

-- Table "plug_type"
CREATE TABLE
    plug_type (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
    );

-- Table "charging_point_plug_type" (Many-to-Many Relationship between "charging_point" and "plug_type")
CREATE TABLE
    charging_point_plug_type (
        id INT AUTO_INCREMENT PRIMARY KEY,
        charging_point_id INT,
        plug_type_id INT,
        FOREIGN KEY (charging_point_id) REFERENCES charging_point(id),
        FOREIGN KEY (plug_type_id) REFERENCES plug_type(id)
    );

-- Table "vehicle"
CREATE TABLE
    vehicle (
        id INT AUTO_INCREMENT PRIMARY KEY,
        brand VARCHAR(255),
        model VARCHAR(255),
        user_id INT,
        plug_type_id INT,
        FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
        FOREIGN KEY (plug_type_id) REFERENCES plug_type(id)
    );

-- Table "reservation"
CREATE TABLE
    reservation (
        id INT AUTO_INCREMENT PRIMARY KEY,
        datetime DATETIME,
        is_cancelled BOOLEAN DEFAULT 0,
        user_id INT,
        charging_point_id INT,
        FOREIGN KEY (user_id) REFERENCES user(id)
         ON DELETE CASCADE,
        FOREIGN KEY (charging_point_id) REFERENCES charging_point(id)
    );

-- Ajout de données dans les tables
INSERT INTO
    user (
        id,
        email,
        password,
        first_name,
        last_name,
        birth_date,
        postal_code,
        city,
        is_admin
    )
VALUES (
        1,
        "admin@mail.com",
        "$2b$10$bIrY.CKNOKkg.EQg.NACM.XuQMxy35G9WNjWPI1KiYKZwNYdl3wXS",
        "Jean",
        "Admin",
        "2000-01-01",
        33300,
        "Bordeaux",
        1
    ), (
        2,
        "antoine@mail.com",
        "$2b$10$A44XwHUG/AbavVxdax0jwuLLBhtX1fWbD4bRDgXNdoc4AmwZGMd/W",
        "Antoine",
        "Cairey",
        "1995-11-24",
        33000,
        "Bordeaux",
        0
    ), (
        3,
        "aurore@mail.com",
        "$2b$10$wLkcXThGCO1z5KzWdFDMxedwKVThOvUsKjhSj6GQnf37YpQ3b1/VW",
        "Aurore",
        "Valleix",
        "1982-03-15",
        33310,
        "Lormont",
        0
    ), (
        4,
        "lucas@mail.com",
        "$2b$10$CSMQNyVCWNq2lckteJ5b6OC8qvrF5r8HrfkBVXl9325BONc3xC4KW",
        "Lucas",
        "Bordes",
        "1995-09-11",
        33000,
        "Bordeaux",
        0
    );

INSERT INTO
    station (
        id,
        name,
        address,
        latitude,
        longitude
    )
VALUES (
        1,
        "Gradignan - Hôtel Campanile",
        "1 allée des demoiselles 33700 Gradignan",
        44.79029300,
        -0.60280900
    ), (
        2,
        "A55 - Aire de Gignac Rebuty (direction Martigues)",
        "A55 - Aire de Gignac Rebuty 13740 Le Rove",
        43.39215200,
        5.25625700
    ), (
        3,
        "Aubervilliers - Lab Village mobilité",
        "102 rue du Port 93300 Aubervilliers",
        48.91973300,
        2.37351000
    );

INSERT INTO
    charging_point (id, name, power, station_id)
VALUES (1, "FRELCECTCH", 150, 1), (2, "FRELCERW8K", 300, 2), (3, "FRELCEUSP8", 150, 3), (4, "FRELCELYCG", 150, 3), (5, "FRELCEF443", 150, 3);

INSERT INTO
    plug_type (id, name)
VALUES (1, "EF"), (2, "Type 2"), (3, "Combo CCS"), (4, "Chademo"), (5, "Autre");

INSERT INTO
    charging_point_plug_type (
        id,
        charging_point_id,
        plug_type_id
    )
VALUES (1, 1, 3), (2, 2, 2), (3, 2, 3), (4, 3, 2), (5, 3, 3), (6, 4, 3), (7, 5, 3);

INSERT INTO
    vehicle (
        id,
        brand,
        model,
        user_id,
        plug_type_id
    )
VALUES (1, "Tesla", "Model Y", 1, 2), (2, "Dacia", "Spring", 2, 2), (3, "Peugeot", "e-208", 3, 2), (4, "Fiat", "500e", 4, 2), (
        5,
        "Renault",
        "Megane e-Tech",
        4,
        2
    );

INSERT INTO
    reservation (
        id,
        datetime,
        is_cancelled,
        user_id,
        charging_point_id
    )
VALUES (
        1,
        "2024-02-09 09:00:00",
        0,
        1,
        1
    ), (
        2,
        "2024-02-09 09:00:00",
        0,
        2,
        2
    ), (
        3,
        "2024-02-09 09:00:00",
        0,
        3,
        3
    ), (
        4,
        "2024-02-09 09:00:00",
        0,
        4,
        4
    ), (
        5,
        "2024-02-07 14:00:00",
        1,
        4,
        5
    );
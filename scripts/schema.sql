CREATE TABLE golf_balls (
    ballId INT AUTO_INCREMENT PRIMARY KEY,
    equipmentName VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    stock INT,
    brand VARCHAR(100)
);

CREATE TABLE golf_clubs (
    clubId INT AUTO_INCREMENT PRIMARY KEY,
    equipmentName VARCHAR(255),
    clubType ENUM('Driver', 'Iron Set', 'Wedge', 'Putter'),
    description TEXT,
    price DECIMAL(10, 2),
    stock INT,
    brand VARCHAR(100)
);
// Author: Addison Farley
// SDEV 372

import mysql from 'mysql2/promise';

const DB_HOST = 'localhost';
const DB_PORT = 3306;
const DB_DATABASE = 'golf_equipment';
const DB_USER = 'afarley';
const DB_PASSWORD = 'F6CraKpFjfbIo1';

// Establish connection to the MySQL database
const connect = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD
});
console.log(`Connected to MySQL on port ${DB_PORT}`);

// Golf Balls operations

// Retrieve all golf balls from the database
async function getAllGolfBalls() {
    const [results] = await connect.query("SELECT * FROM golf_balls");
    return results;
}

// Retrieve a golf ball by ID
async function getGolfBallById(id) {
    const [results] = await connect.query("SELECT * FROM golf_balls WHERE ballId = ?", [id]);
    return results;
}

// Add a new golf ball to the database
async function addGolfBall(equipmentName, description, price, stock, brand) {
    const [result] = await connect.query(
        "INSERT INTO golf_balls (equipmentName, description, price, stock, brand) VALUES (?, ?, ?, ?, ?)",
        [equipmentName, description, price, stock, brand]
    );
    return result.insertId;
}

// Update an existing golf ball in the database
async function updateGolfBall(id, equipmentName, description, price, stock, brand) {
    const [result] = await connect.query(
        "UPDATE golf_balls SET equipmentName = ?, description = ?, price = ?, stock = ?, brand = ? WHERE ballId = ?",
        [equipmentName, description, price, stock, brand, id]
    );
    return result.affectedRows;
}

// Delete a golf ball from the database by ID
async function deleteGolfBall(id) {
    const [result] = await connect.query("DELETE FROM golf_balls WHERE ballId = ?", [id]);
    return result.affectedRows;
}

// Golf Clubs operations

// Retrieve all golf clubs from the database
async function getAllGolfClubs() {
    const [results] = await connect.query("SELECT * FROM golf_clubs");
    return results;
}

// Retrieve a golf club by ID
async function getGolfClubById(id) {
    const [results] = await connect.query("SELECT * FROM golf_clubs WHERE clubId = ?", [id]);
    return results;
}

// Add a new golf club to the database
async function addGolfClub(equipmentName, clubType, description, price, stock, brand) {
    const [result] = await connect.query(
        "INSERT INTO golf_clubs (equipmentName, clubType, description, price, stock, brand) VALUES (?, ?, ?, ?, ?, ?)",
        [equipmentName, clubType, description, price, stock, brand]
    );
    return result.insertId;
}

// Update an existing golf club in the database
async function updateGolfClub(id, equipmentName, clubType, description, price, stock, brand) {
    const [result] = await connect.query(
        "UPDATE golf_clubs SET equipmentName = ?, clubType = ?, description = ?, price = ?, stock = ?, brand = ? WHERE clubId = ?",
        [equipmentName, clubType, description, price, stock, brand, id]
    );
    return result.affectedRows;
}

// Delete a golf club from the database by ID
async function deleteGolfClub(id) {
    const [result] = await connect.query("DELETE FROM golf_clubs WHERE clubId = ?", [id]);
    return result.affectedRows;
}

// Exporting all functions for external access
export default {
    getAllGolfBalls,
    getGolfBallById,
    addGolfBall,
    updateGolfBall,
    deleteGolfBall,
    getAllGolfClubs,
    getGolfClubById,
    addGolfClub,
    updateGolfClub,
    deleteGolfClub
};

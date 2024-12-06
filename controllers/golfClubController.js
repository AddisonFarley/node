// Author: Addison Farley
// SDEV 372

import db from '../db/golfEquipment.js';

// Retrieve all golf clubs
export const getClubs = async (req, res) => {
    try {
        // Fetch all golf clubs from the database
        const clubs = await db.getAllGolfClubs();
        res.status(200).send({
            message: `Returning ${clubs.length} golf clubs`,
            equipment: clubs
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Retrieve a specific golf club by ID
export const getClubById = async (req, res) => {
    const id = parseInt(req.params.id);

    // Validate ID
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        // Fetch the golf club by ID
        const result = await db.getGolfClubById(id);

        if (result.length !== 0) {
            res.status(200).json({
                message: `Found golf club with id ${id}`,
                equipment: result[0]
            });
        } else {
            res.status(404).json({
                message: `No golf club found with ID: ${id}`
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Add a new golf club
export const addClub = async (req, res) => {
    const { equipmentName, clubType, description, price, stock, brand } = req.body;

    // Validate required fields
    if (!equipmentName || !clubType || !description || price == null || stock == null || !brand) {
        return res.status(400).json({ message: "Missing or invalid field values" });
    }

    try {
        // Insert a new golf club record into the database
        const newClubId = await db.addGolfClub(equipmentName, clubType, description, parseFloat(price), parseInt(stock), brand);
        res.status(201).send({
            message: `Golf club saved with ID: ${newClubId}`
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a golf club's details by ID
export const updateClub = async (req, res) => {
    const id = parseInt(req.params.id);
    const { equipmentName, clubType, description, price, stock, brand } = req.body;

    // Validate ID and required fields
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    if (!equipmentName || !clubType || !description || price == null || stock == null || !brand) {
        return res.status(400).json({ message: "Missing or invalid field values" });
    }

    try {
        // Update the golf club record in the database
        const rowsUpdated = await db.updateGolfClub(id, equipmentName, clubType, description, parseFloat(price), parseInt(stock), brand);
        if (rowsUpdated > 0) {
            res.status(200).json({
                message: `Golf club with ID: ${id} updated`
            });
        } else {
            res.status(404).json({
                message: `No golf club found with ID: ${id}`
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a golf club by ID
export const deleteClub = async (req, res) => {
    const id = parseInt(req.params.id);

    // Validate ID
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        // Delete the golf club record from the database
        const rowsDeleted = await db.deleteGolfClub(id);

        if (rowsDeleted > 0) {
            res.status(200).json({
                message: `Golf club with ID: ${id} deleted`
            });
        } else {
            res.status(404).json({
                message: `No golf club found with ID: ${id}`
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

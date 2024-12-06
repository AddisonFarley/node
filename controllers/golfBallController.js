// Author: Addison Farley
// SDEV 372

import db from './../db/golfEquipment.js';

// Retrieve all golf balls
export const getBalls = async (req, res) => {
    try {
        const balls = await db.getAllGolfBalls();
        res.status(200).json(balls); // Return array directly
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Retrieve a specific golf ball by ID
export const getBallById = async (req, res) => {
    const id = parseInt(req.params.id);

    // Check if the provided ID is a valid number
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        // Fetch the golf ball by ID from the database
        const result = await db.getGolfBallById(id);

        if (result.length !== 0) {
            res.status(200).json({
                message: `Found golf ball with id ${id}`,
                equipment: result[0]
            });
        } else {
            // Golf ball not found response
            res.status(404).json({
                message: `No golf ball found with ID: ${id}`
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Add a new golf ball to the inventory
export const addBall = async (req, res) => {
    const { equipmentName, description, price, stock, brand } = req.body;

    // Validate required fields
    if (!equipmentName || !description || price == null || stock == null || !brand) {
        return res.status(400).json({ message: "Missing or invalid field values" });
    }

    try {
        // Insert a new golf ball record into the database
        const newBallId = await db.addGolfBall(equipmentName, description, parseFloat(price), parseInt(stock), brand);
        res.status(201).send({
            message: `Golf ball saved with ID: ${newBallId}`
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a golf ball's details by ID
export const updateBall = async (req, res) => {
    const id = parseInt(req.params.id);
    const { equipmentName, description, price, stock, brand } = req.body;

    // Validate ID and required fields
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    if (!equipmentName || !description || price == null || stock == null || !brand) {
        return res.status(400).json({ message: "Missing or invalid field values" });
    }

    try {
        // Update the golf ball record in the database
        const rowsUpdated = await db.updateGolfBall(id, equipmentName, description, parseFloat(price), parseInt(stock), brand);
        if (rowsUpdated > 0) {
            res.status(200).json({
                message: `Golf ball with ID: ${id} updated`
            });
        } else {
            res.status(404).json({
                message: `No golf ball found with ID: ${id}`
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a golf ball by ID
export const deleteBall = async (req, res) => {
    const id = parseInt(req.params.id);

    // Validate ID
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        // Delete the golf ball record from the database
        const rowsDeleted = await db.deleteGolfBall(id);

        if (rowsDeleted > 0) {
            res.status(200).json({
                message: `Golf ball with ID: ${id} deleted`
            });
        } else {
            res.status(404).json({
                message: `No golf ball found with ID: ${id}`
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

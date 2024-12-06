//Author: Addison Farley
//SDEV 372

import express from 'express';
import { addBall, getBallById, getBalls, updateBall, deleteBall } from './../controllers/golfBallController.js';

const ballRouter = express.Router();

// Golf Balls routes
// Add new golf ball
ballRouter.post("/", addBall);
// Get all golf balls                
ballRouter.get("/", getBalls);
// Get golf ball by ID               
ballRouter.get("/:id", getBallById);
// Update golf ball by ID          
ballRouter.patch("/:id", updateBall);
// Delete golf ball by ID          
ballRouter.delete("/:id", deleteBall);

export default ballRouter;

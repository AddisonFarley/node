//Author: Addison Farley
//SDEV 372

import express from 'express';
import { addClub, getClubById, getClubs, updateClub, deleteClub } from './../controllers/golfClubController.js';

const clubRouter = express.Router();

//routes
// Add new golf club
clubRouter.post("/", addClub);
// Get all golf clubs                 
clubRouter.get("/", getClubs);
// Get golf club by ID                 
clubRouter.get("/:id", getClubById);
// Update golf club by ID           
clubRouter.patch("/:id", updateClub);
// Delete golf club by ID          
clubRouter.delete("/:id", deleteClub);

export default clubRouter;

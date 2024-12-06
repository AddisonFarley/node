//Author: Addison Farley
//SDEV 372

import express from 'express';
import ballRouter from './routers/golfBallRouter.js';
import clubRouter from './routers/golfClubRouter.js';

//create new express server
const app = express();

//serve up static files from the /public directory
app.use(express.static("./public"));

//show homepage of index.html in /public
app.get('/home.html', (req, res) => {
    res.sendfile("public/index.html");
});

//read json requests
app.use(express.json());

//mount router
app.use("/api/v1/golf/balls", ballRouter);
app.use("/api/v1/golf/clubs", clubRouter);

//bind to a port and start server
app.listen(4242, '0.0.0.0', () => console.log(`Server started on port 4242`));

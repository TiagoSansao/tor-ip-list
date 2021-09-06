// TODO ->
// Send the routes from this file to the routes.js 


// IMPORTS AND CONFIGS

import express from 'express';
import getUnifiedIps from './utils/get-unified-ips.js';
// import routes from './routes';
import {} from 'dotenv/config';

const app = express();
const UnifiedIps = await getUnifiedIps();
const port = process.env.PORT || 5555;

// MIDDLEWARES

// app.use(routes); 


//

app.get("/ips", (req, res) => {
  res.status(200).json(UnifiedIps);
});

app.get("/filtered-ips", (req, res) => {

});

app.post("/filter-ip"), (req, res) => {

};


//

app.listen(port, () => {
  console.log(`TOR IP LIST's back-end running on port: ${port}!`);
});
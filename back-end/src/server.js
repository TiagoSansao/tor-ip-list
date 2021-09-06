// TODO ->
// Send the routes from this file to the routes.js 


// IMPORTS AND CONFIGS

import express from 'express';
import cors from 'cors';
import getUnifiedIps from './utils/get-unified-ips.js';
import Blacklist from './database/models/blacklist.js';
import connect from "./database/connect.js";
// import routes from './routes';
import {} from 'dotenv/config';

const app = express();
const UnifiedIps = await getUnifiedIps();
const port = process.env.PORT || 5555;

// CONNECT TO DATABASE

connect();

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
// app.use(routes); 


//

app.get("/ips", (req, res) => {

  res.status(200).json(UnifiedIps);
});

app.get("/filtered-ips", (req, res) => {
  
});

app.post("/filter-ip", (req, res) => {
  const ip = req.body.ip;
  console.log(req.body);
  const newBlacklistedIp = new Blacklist({ip: ip});
  newBlacklistedIp.save((err, result) => {
    if (err) res.status(400).json({status: "Bad request!"});
    else res.status(200).json({status: "IP added successfully"});
  })
});


//

app.listen(port, () => {
  console.log(`TOR IP LIST's back-end running on port: ${port}!`);
});
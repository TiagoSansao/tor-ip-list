// IMPORTS AND CONFIGS

import express from 'express';
import cors from 'cors';
import connect from "./database/connect.js";
import routes from './routes.js';
import {} from 'dotenv/config';

const app = express();

const port = process.env.PORT || 5555;

// CONNECT TO DATABASE

connect();

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(routes); 

// TURNING ON 

app.listen(port, () => {
  console.log(`TOR IP LIST's back-end running on port: ${port}!`);
});
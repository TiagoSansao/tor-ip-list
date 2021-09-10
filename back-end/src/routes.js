import Router from 'express';
import Blacklist from './database/models/blacklist.js';
import getUnifiedIps from './utils/get-unified-ips.js';

const unifiedIps = await getUnifiedIps();
const routes = Router();

routes.get("/ips", (req, res) => {
  res.status(200).json({ips: unifiedIps});
});

routes.get("/filtered-ips", async (req, res) => {
  const blacklistedIps = [];
  const savedIps = [];
  const unifiedIpsWithoutTheSavedIps = [...unifiedIps];
  const savedIpsObj = await Blacklist
  .find()
  .select({_id: 0, __v: 0})
  .exec();
  for (let key in savedIpsObj) {
    savedIps.push(savedIpsObj[key].ip);
  };
  savedIps.forEach((savedIp) => {
    const index = unifiedIpsWithoutTheSavedIps.indexOf(savedIp);
    if (index !== -1) {
      blacklistedIps.push(unifiedIpsWithoutTheSavedIps[index]);
      unifiedIpsWithoutTheSavedIps.splice(index, 1);
    };
  });
  res.status(200).json({ips: unifiedIpsWithoutTheSavedIps, blacklistedIps});
});

routes.post("/blacklist-ip", async (req, res) => {
  const ip = req.body.ip;
  if (!ip) return res.status(400).send();
  const checkIfExists = await Blacklist.findOne({ip: ip});
  if (checkIfExists !== null) return res.status(200).json({status: `Error: the IP: ${ip} is already blacklisted`})
  const newBlacklistedIp = new Blacklist({ ip: ip });
  newBlacklistedIp.save((err, result) => {
    if (err) res.status(400).json({status: "Bad request"});
    else res.status(200).json({status: `Successfully added IP: ${ip} to the blacklist`});
  });
});

routes.post("/unblacklist-ip", (req, res) => {
  const ip = req.body.ip;
  if (!ip) return res.status(400).send();
  Blacklist.find({ip: ip}).deleteMany((err, result) => {
    if (err) console.log(err);
    if (result.deletedCount === 0) res.status(200).json({status: `Error: the IP: ${ip} wasn't blacklisted.`}) 
    else  res.status(200).json({status: `Successfully removed IP: ${ip} from the backlist.`}) 
  });
});

export default routes;
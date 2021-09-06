import Router from 'express';
import Blacklist from './database/models/blacklist.js';
import getUnifiedIps from './utils/get-unified-ips.js';

const unifiedIps = await getUnifiedIps();
const routes = Router();

routes.get("/ips", (req, res) => {
  res.status(200).json(unifiedIps);
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

routes.post("/filter-ip", (req, res) => {
  const ip = req.body.ip;
  const newBlacklistedIp = new Blacklist({ ip: ip });
  newBlacklistedIp.save((err, result) => {
    if (err) res.status(400).json({status: "Bad request!"});
    else res.status(200).json({status: `Successfully added IP: ${ip} to the blacklist!`});
  });
});

export default routes;
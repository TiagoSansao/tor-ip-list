import Router from 'express';

const routes = Router();

routes.get("/ips");
routes.get("/filtered-ips");
routes.post("/filter-ip");

export default routes;
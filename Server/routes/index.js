import routerUser from "./users.js";


function configRoutes(app) {
  app.use("/users", routerUser);
}
export default configRoutes;
// Path: Server/routes/RoutesUsers.js

const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("F:\rbac-ui\rbac-\src\db.json"); // Path to your db.json
const middlewares = jsonServer.defaults();

server.use(cors()); // Enable CORS
server.use(middlewares);
server.use(router);

server.listen(5000, () => {
  console.log("JSON Server is running on http://localhost:5000");
});

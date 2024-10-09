import http from "http";
import { app } from "./app";

const server = http.createServer(app);

// start server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
